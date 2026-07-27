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
                    'thumbnail' => $project->thumbnail_url ?: $project->portfolioImages->first()?->media?->s3_url,
                    'client' => $project->client_name,
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
            ->with(['portfolioImages.media', 'service'])
            ->firstOrFail();

        $images = $project->portfolioImages
            ->sortBy('display_order')
            ->map(fn ($img) => ['url' => $img->media?->s3_url, 'alt' => $img->alt_text ?: $project->title])
            ->filter(fn ($item) => $item['url'])
            ->values()
            ->toArray();

        if ($project->thumbnail_url) {
            array_unshift($images, ['url' => $project->thumbnail_url, 'alt' => $project->title]);
        }

        return Inertia::render('Public/Portfolio/Show', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'client' => $project->client_name,
                'project_date' => $project->project_date,
                'carousel' => $images,
            ],
        ]);
    }
}
