<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(Request $request): Response
    {
        $query = Media::query();

        if ($request->filled('media_type')) {
            $query->where('media_type', $request->media_type);
        }

        return Inertia::render('Admin/Media/Index', [
            'media' => $query->latest()->get()->map(fn ($m) => [
                'id' => $m->id,
                'filename' => $m->filename,
                'original_name' => $m->original_filename,
                'mime_type' => $m->mime_type,
                'size' => $m->file_size,
                'url' => $m->s3_url,
                'created_at' => $m->created_at,
            ]),
            'filters' => $request->only(['media_type']),
        ]);
    }

    public function upload(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'max:51200'],
        ]);

        $file = $request->file('file');
        $isImage = str_starts_with($file->getMimeType(), 'image/');

        if ($isImage) {
            $data = $this->imageService->convertToWebp($file, 'media');
        } else {
            $disk = $this->storageDisk();
            $path = $file->store('media', $disk);
            $data = [
                'filename' => $file->hashName(),
                'original_filename' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                's3_path' => $path,
                's3_url' => Storage::disk($disk)->url($path),
            ];
        }

        $mediaType = 'document';
        if (str_starts_with($data['mime_type'], 'image/')) $mediaType = 'image';
        elseif (str_starts_with($data['mime_type'], 'video/')) $mediaType = 'video';

        Media::create([
            'filename' => $data['filename'],
            'original_filename' => $data['original_filename'],
            'mime_type' => $data['mime_type'],
            'file_size' => $data['file_size'],
            's3_path' => $data['s3_path'],
            's3_url' => $data['s3_url'],
            'media_type' => $mediaType,
        ]);

        return redirect()->back()->with('success', 'File berhasil diupload.');
    }

    public function destroy($id): RedirectResponse
    {
        $media = Media::findOrFail($id);
        $disk = $this->storageDisk();

        Storage::disk($disk)->delete($media->s3_path);
        $media->delete();

        return redirect()->back()->with('success', 'File berhasil dihapus.');
    }

    protected function storageDisk(): string
    {
        return filled(env('AWS_BUCKET')) ? 's3' : 'public';
    }
}
