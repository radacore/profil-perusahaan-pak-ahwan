<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Models\Media;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Team/Index', [
            'members' => TeamMember::with('media')->orderBy('display_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Team/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $validated['is_published'] = $validated['is_published'] ?? true;
        TeamMember::create($validated);

        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        return Inertia::render('Admin/Team/Edit', [
            'member' => TeamMember::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $member = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $member->update($validated);

        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        TeamMember::findOrFail($id)->delete();

        return redirect()->route('admin.team.index')->with('success', 'Anggota tim berhasil dihapus.');
    }

    public function uploadPhoto(Request $request, $id): RedirectResponse
    {
        $request->validate(['photo' => ['required', 'image', 'max:5120']]);

        $data = $this->imageService->convertToWebp($request->file('photo'), 'team/photos');

        $media = Media::create([
            'filename' => $data['filename'],
            'original_filename' => $data['original_filename'],
            'mime_type' => $data['mime_type'],
            'file_size' => $data['file_size'],
            's3_path' => $data['s3_path'],
            's3_url' => $data['s3_url'],
            'media_type' => 'image',
        ]);

        TeamMember::findOrFail($id)->update(['media_id' => $media->id]);

        return redirect()->back()->with('success', 'Foto berhasil diupload.');
    }
}
