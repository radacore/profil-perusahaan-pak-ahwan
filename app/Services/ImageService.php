<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ImageService
{
    protected const QUALITY = 100;

    protected function storageDisk(): string
    {
        return filled(env('AWS_BUCKET')) ? 's3' : 'public';
    }

    public function convertToWebp(UploadedFile $file, string $directory): array
    {
        $disk = $this->storageDisk();
        $sourcePath = $file->getRealPath();
        $mime = $file->getMimeType();
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $webpFilename = $originalName . '-' . uniqid() . '.webp';

        $image = match ($mime) {
            'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($sourcePath),
            'image/png' => @imagecreatefrompng($sourcePath),
            'image/gif' => @imagecreatefromgif($sourcePath),
            'image/webp' => @imagecreatefromwebp($sourcePath),
            'image/avif' => @imagecreatefromavif($sourcePath),
            default => null,
        };

        if (!$image) {
            $opts = $disk === 's3' ? ['disk' => $disk, 'visibility' => 'public'] : $disk;
            $path = $file->store($directory, $opts);
            return [
                'filename' => $file->hashName(),
                'original_filename' => $file->getClientOriginalName(),
                'mime_type' => $mime,
                'file_size' => $file->getSize(),
                's3_path' => $path,
                's3_url' => $disk === 's3' ? URL::route('s3.proxy', ['path' => $path], false) : Storage::disk($disk)->url($path),
            ];
        }

        if (!imageistruecolor($image)) {
            imagepalettetotruecolor($image);
        }

        imagealphablending($image, false);
        imagesavealpha($image, true);

        $tempPath = sys_get_temp_dir() . '/' . $webpFilename;
        imagewebp($image, $tempPath, self::QUALITY);
        imagedestroy($image);

        $webpSize = filesize($tempPath);
        $options = $disk === 's3' ? ['visibility' => 'public'] : [];
        $storedPath = Storage::disk($disk)->putFileAs($directory, new UploadedFile($tempPath, $webpFilename), $webpFilename, $options);

        @unlink($tempPath);

        return [
            'filename' => $webpFilename,
            'original_filename' => $originalName . '.webp',
            'mime_type' => 'image/webp',
            'file_size' => $webpSize,
            's3_path' => $storedPath,
            's3_url' => $disk === 's3' ? URL::route('s3.proxy', ['path' => $storedPath], false) : Storage::disk($disk)->url($storedPath),
        ];
    }
}
