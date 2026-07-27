<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string|null $content
 * @property string|null $mission
 * @property string|null $vision
 * @property array|null $values
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $meta_og_image
 * @property string|null $meta_og_title
 * @property string|null $meta_og_description
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'title',
    'content',
    'mission',
    'vision',
    'values',
    'meta_title',
    'meta_description',
    'meta_og_image',
    'meta_og_title',
    'meta_og_description',
    'is_published',
])]
class Page extends Model
{
    protected function casts(): array
    {
        return [
            'values' => 'array',
        ];
    }

    public function contentVersions(): HasMany
    {
        return $this->hasMany(ContentVersion::class, 'page_id');
    }
}
