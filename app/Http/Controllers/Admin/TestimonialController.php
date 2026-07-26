<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(Request $request): Response
    {
        $query = Testimonial::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $query->latest()->paginate(15),
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_name' => ['required', 'string', 'max:255'],
            'client_company' => ['nullable', 'string', 'max:255'],
            'client_title' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'status' => ['required', 'in:pending,approved,rejected'],
        ]);

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => Testimonial::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'client_name' => ['required', 'string', 'max:255'],
            'client_company' => ['nullable', 'string', 'max:255'],
            'client_title' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'status' => ['required', 'in:pending,approved,rejected'],
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        Testimonial::findOrFail($id)->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil dihapus.');
    }

    public function uploadImage(Request $request, $id): RedirectResponse
    {
        $request->validate(['image' => ['required', 'image', 'max:3072']]);

        $data = $this->imageService->convertToWebp($request->file('image'), 'testimonials');
        Testimonial::findOrFail($id)->update(['image_url' => $data['s3_url']]);

        return redirect()->back()->with('success', 'Gambar berhasil diupload.');
    }
}
