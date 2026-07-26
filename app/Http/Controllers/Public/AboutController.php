<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use App\Models\Page;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Public/About', [
            'page' => Page::where('slug', 'about')->first(),
            'settings' => GlobalSetting::pluck('setting_value', 'setting_key'),
        ]);
    }
}
