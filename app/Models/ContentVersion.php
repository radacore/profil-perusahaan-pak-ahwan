<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $page_id
 * @property string|null $content
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property int|null $admin_id
 * @property string|null $change_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'page_id',
    'content',
    'meta_title',
    'meta_description',
    'admin_id',
    'change_notes',
])]
class ContentVersion extends Model
{
    protected $table = 'page_versions';


    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
