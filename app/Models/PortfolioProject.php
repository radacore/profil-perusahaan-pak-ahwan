<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string|null $description
 * @property int|null $service_id
 * @property string|null $client_name
 * @property \Illuminate\Support\Carbon|null $project_date
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'slug',
    'title',
    'description',
    'service_id',
    'client_name',
    'project_date',
    'is_published',
    'thumbnail_url',
])]
class PortfolioProject extends Model
{
    protected function casts(): array
    {
        return [
            'project_date' => 'date:Y-m-d',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function portfolioImages(): HasMany
    {
        return $this->hasMany(PortfolioImage::class);
    }
}
