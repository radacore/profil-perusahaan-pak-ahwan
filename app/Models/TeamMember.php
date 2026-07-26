<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $name
 * @property string|null $title
 * @property string|null $bio
 * @property int|null $media_id
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $linkedin_url
 * @property int|null $display_order
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'title',
    'bio',
    'media_id',
    'email',
    'phone',
    'linkedin_url',
    'display_order',
    'is_published',
])]
class TeamMember extends Model
{
    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }
}
