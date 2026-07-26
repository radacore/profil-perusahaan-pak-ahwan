<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'name',
])]
class BlogTag extends Model
{
    public function blogPosts(): BelongsToMany
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tag');
    }
}
