<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
            $path = $file->store($directory, $disk);
            return [
                'filename' => $file->hashName(),
                'original_filename' => $file->getClientOriginalName(),
                'mime_type' => $mime,
                'file_size' => $file->getSize(),
                's3_path' => $path,
                's3_url' => Storage::disk($disk)->url($path),
            ];
        }

        if (imageistruecolor($image)) {
            imagealphablending($image, false);
            imagesavealpha($image, true);
        }

        $tempPath = sys_get_temp_dir() . '/' . $webpFilename;
        imagewebp($image, $tempPath, self::QUALITY);
        imagedestroy($image);

        $webpSize = filesize($tempPath);
        $storedPath = Storage::disk($disk)->putFileAs($directory, new UploadedFile($tempPath, $webpFilename), $webpFilename);

        @unlink($tempPath);

        return [
            'filename' => $webpFilename,
            'original_filename' => $originalName . '.webp',
            'mime_type' => 'image/webp',
            'file_size' => $webpSize,
            's3_path' => $storedPath,
            's3_url' => Storage::disk($disk)->url($storedPath),
        ];
    }
}
