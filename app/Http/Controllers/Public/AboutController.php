<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Public/About', [
            'page' => Page::where('slug', 'about')->first(),
        ]);
    }
}
