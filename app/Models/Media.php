<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string|null $filename
 * @property string|null $original_filename
 * @property string|null $mime_type
 * @property int|null $file_size
 * @property string|null $s3_path
 * @property string|null $s3_url
 * @property string|null $media_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'filename',
    'original_filename',
    'mime_type',
    'file_size',
    's3_path',
    's3_url',
    'media_type',
])]
class Media extends Model
{
    public function portfolioImages(): HasMany
    {
        return $this->hasMany(PortfolioImage::class);
    }

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }
}
