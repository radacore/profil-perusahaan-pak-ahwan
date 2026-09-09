<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function show(string $slug)
    {
        $project = PortfolioProject::where('slug', $slug)
            ->where('is_published', true)
            ->with(['service', 'portfolioImages.media'])
            ->firstOrFail();

        $gallery = $project->portfolioImages
            ->sortBy('display_order')
            ->values()
            ->map(fn ($img) => [
                'id' => $img->id,
                'alt_text' => $img->alt_text,
                'display_order' => $img->display_order,
                'url' => $img->media?->s3_url,
            ])
            ->filter(fn ($g) => ! empty($g['url']))
            ->values();

        $thumbnail = $project->thumbnail_url ?: ($gallery->first()['url'] ?? null);

        return Inertia::render('Public/Portfolio/Show', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'thumbnail' => $thumbnail,
                'client' => $project->client_name,
                'project_date' => $project->project_date?->format('Y-m-d'),
                'service' => $project->service ? ['id' => $project->service->id, 'title' => $project->service->title, 'slug' => $project->service->slug] : null,
                'gallery' => $gallery,
            ],
        ]);
    }
}
