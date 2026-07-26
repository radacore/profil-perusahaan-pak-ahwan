<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string|null $content
 * @property int|null $blog_category_id
 * @property string|null $author
 * @property string|null $status
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $featured_image_url
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'title',
    'content',
    'blog_category_id',
    'author',
    'status',
    'meta_title',
    'meta_description',
    'featured_image_url',
    'published_at',
])]
class BlogPost extends Model
{
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function blogCategory(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function blogTags(): BelongsToMany
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }
}
