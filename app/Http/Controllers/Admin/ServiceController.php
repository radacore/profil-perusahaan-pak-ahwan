<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'services' => Service::orderBy('display_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:services,slug'],
            'description' => ['nullable', 'string'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $validated['is_published'] = $validated['is_published'] ?? true;
        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => Service::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:services,slug,' . $id],
            'description' => ['nullable', 'string'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        Service::findOrFail($id)->delete();

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil dihapus.');
    }

    public function uploadIcon(Request $request, $id): RedirectResponse
    {
        $request->validate(['icon' => ['required', 'image', 'max:2048']]);

        $data = $this->imageService->convertToWebp($request->file('icon'), 'services/icons');
        Service::findOrFail($id)->update(['icon_url' => $data['s3_url']]);

        return redirect()->back()->with('success', 'Ikon berhasil diupload.');
    }

    public function uploadImage(Request $request, $id): RedirectResponse
    {
        $request->validate(['image' => ['required', 'image', 'max:5120']]);

        $data = $this->imageService->convertToWebp($request->file('image'), 'services/images');
        Service::findOrFail($id)->update(['icon_url' => $data['s3_url']]);

        return redirect()->back()->with('success', 'Gambar berhasil diupload.');
    }
}
