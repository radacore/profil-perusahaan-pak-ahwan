<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use App\Models\Service;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Portfolio/Index', [
            'projects' => PortfolioProject::where('is_published', true)
                ->with(['portfolioImages', 'service'])
                ->orderBy('created_at', 'desc')
                ->paginate(15)
                ->through(fn ($project) => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'description' => $project->description,
                    'client_name' => $project->client_name,
                    'project_date' => $project->project_date,
                    'service' => $project->service,
                    'created_at' => $project->created_at,
                ]),
            'services' => Service::where('is_published', true)
                ->orderBy('display_order')
                ->get(['id', 'title', 'slug']),
        ]);
    }

    public function show($slug)
    {
        $project = PortfolioProject::where('slug', $slug)
            ->where('is_published', true)
            ->with(['portfolioImages', 'service'])
            ->firstOrFail();

        return Inertia::render('Public/Portfolio/Show', [
            'project' => $project,
            'gallery' => $project->portfolioImages()->orderBy('display_order')->get(),
        ]);
    }
}
