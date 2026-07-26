<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $client_name
 * @property string|null $client_company
 * @property string|null $client_title
 * @property string $message
 * @property int|null $rating
 * @property string|null $image_url
 * @property string|null $status
 * @property int|null $display_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
#[Fillable([
    'client_name',
    'client_company',
    'client_title',
    'message',
    'rating',
    'image_url',
    'status',
    'display_order',
])]
class Testimonial extends Model
{
    //
}
