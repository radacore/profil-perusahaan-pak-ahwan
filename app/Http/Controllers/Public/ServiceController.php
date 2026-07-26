<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Services/Index', [
            'services' => Service::where('is_published', true)
                ->orderBy('display_order')
                ->get(),
        ]);
    }

    public function show($slug)
    {
        $service = Service::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('Public/Services/Show', [
            'service' => $service,
            'projects' => PortfolioProject::where('is_published', true)
                ->where('service_id', $service->id)
                ->with('portfolioImages')
                ->get(),
        ]);
    }
}
