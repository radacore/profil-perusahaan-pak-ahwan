<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string|null $description
 * @property string|null $short_description
 * @property string|null $icon_url
 * @property int|null $display_order
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'title',
    'description',
    'short_description',
    'icon_url',
    'display_order',
    'is_published',
])]
class Service extends Model
{
    public function portfolioProjects(): HasMany
    {
        return $this->hasMany(PortfolioProject::class);
    }
}
