<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $portfolio_project_id
 * @property int|null $media_id
 * @property int|null $display_order
 * @property string|null $alt_text
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'portfolio_project_id',
    'media_id',
    'display_order',
    'alt_text',
])]
class PortfolioImage extends Model
{
    public function portfolioProject(): BelongsTo
    {
        return $this->belongsTo(PortfolioProject::class);
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }
}
