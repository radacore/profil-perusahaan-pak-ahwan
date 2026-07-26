<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioImage;
use App\Models\PortfolioProject;
use App\Models\Media;
use App\Models\Service;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioProjectController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Portfolio/Index', [
            'projects' => PortfolioProject::with('service')
                ->latest()
                ->paginate(15)
                ->through(fn ($project) => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'client_name' => $project->client_name,
                    'project_date' => $project->project_date?->format('Y-m-d'),
                    'is_published' => $project->is_published,
                    'service' => $project->service?->only(['id', 'title']),
                    'created_at' => $project->created_at,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Portfolio/Create', [
            'services' => Service::orderBy('title')->get(['id', 'title']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:portfolio_projects,slug'],
            'description' => ['nullable', 'string'],
            'client_name' => ['required', 'string', 'max:255'],
            'project_date' => ['required', 'date'],
            'service_id' => ['nullable', 'exists:services,id'],
            'is_published' => ['nullable', 'boolean'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,gif,webp', 'max:5120'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = str($validated['title'])->slug();
        }

        $validated['is_published'] = $validated['is_published'] ?? true;

        $project = PortfolioProject::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $data = $this->imageService->convertToWebp($image, 'portfolio');

                if ($index === 0) {
                    $project->update(['thumbnail_url' => $data['s3_url']]);
                }

                $media = Media::create([
                    'filename' => $data['filename'],
                    'original_filename' => $data['original_filename'],
                    'mime_type' => $data['mime_type'],
                    'file_size' => $data['file_size'],
                    's3_path' => $data['s3_path'],
                    's3_url' => $data['s3_url'],
                    'media_type' => 'image',
                ]);

                PortfolioImage::create([
                    'portfolio_project_id' => $project->id,
                    'media_id' => $media->id,
                    'alt_text' => $project->title,
                    'display_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        $project = PortfolioProject::with('portfolioImages.media')->findOrFail($id);

        $projectData = $project->toArray();
        $projectData['project_date'] = $project->project_date?->format('Y-m-d');

        return Inertia::render('Admin/Portfolio/Edit', [
            'project' => $projectData,
            'services' => Service::orderBy('title')->get(['id', 'title']),
            'gallery' => $project->portfolioImages->sortBy('display_order')->values(),
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $project = PortfolioProject::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:portfolio_projects,slug,' . $id],
            'description' => ['nullable', 'string'],
            'client_name' => ['required', 'string', 'max:255'],
            'project_date' => ['required', 'date'],
            'service_id' => ['nullable', 'exists:services,id'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = str($validated['title'])->slug();
        }

        $project->update($validated);

        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        PortfolioProject::findOrFail($id)->delete();

        return redirect()->route('admin.portfolio.index')->with('success', 'Proyek berhasil dihapus.');
    }

    public function uploadThumbnail(Request $request, $id): RedirectResponse
    {
        $request->validate(['thumbnail' => ['required', 'image', 'max:5120']]);

        $data = $this->imageService->convertToWebp($request->file('thumbnail'), 'portfolio/thumbnails');
        PortfolioProject::findOrFail($id)->update(['thumbnail_url' => $data['s3_url']]);

        return redirect()->back()->with('success', 'Thumbnail berhasil diupload.');
    }

    public function addGalleryImage(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'max:5120'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        $data = $this->imageService->convertToWebp($request->file('image'), 'portfolio/gallery');

        $media = Media::create([
            'filename' => $data['filename'],
            'original_filename' => $data['original_filename'],
            'mime_type' => $data['mime_type'],
            'file_size' => $data['file_size'],
            's3_path' => $data['s3_path'],
            's3_url' => $data['s3_url'],
            'media_type' => 'image',
        ]);

        PortfolioImage::create([
            'portfolio_project_id' => $id,
            'media_id' => $media->id,
            'alt_text' => $request->input('caption'),
        ]);

        return redirect()->back()->with('success', 'Gambar berhasil ditambahkan ke galeri.');
    }

    public function deleteGalleryImage($projectId, $galleryId): RedirectResponse
    {
        $image = PortfolioImage::where('portfolio_project_id', $projectId)
            ->findOrFail($galleryId);
        $image->delete();

        return redirect()->back()->with('success', 'Gambar galeri berhasil dihapus.');
    }

    public function reorderGallery(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'gallery_order' => ['required', 'array'],
            'gallery_order.*.id' => ['required', 'exists:portfolio_images,id'],
            'gallery_order.*.order' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($request->gallery_order as $item) {
            PortfolioImage::where('id', $item['id'])
                ->where('portfolio_project_id', $id)
                ->update(['display_order' => $item['order']]);
        }

        return redirect()->back()->with('success', 'Urutan galeri berhasil diperbarui.');
    }
}
