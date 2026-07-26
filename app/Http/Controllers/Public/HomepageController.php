<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\GlobalSetting;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Public/Homepage', [
            'settings' => GlobalSetting::pluck('setting_value', 'setting_key'),
            'services' => Service::where('is_published', true)
                ->orderBy('display_order')
                ->get(),
            'posts' => BlogPost::where('status', 'published')
                ->latest('published_at')
                ->take(3)
                ->get(),
            'testimonials' => Testimonial::where('status', 'approved')
                ->orderBy('display_order')
                ->get(),
        ]);
    }
}
