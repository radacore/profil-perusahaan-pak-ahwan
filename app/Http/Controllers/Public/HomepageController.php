<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\PortfolioProject;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function __invoke()
    {
        $data = Cache::remember('homepage_data', 600, function () {
            return [
                'services' => Service::where('is_published', true)->orderBy('display_order')->get()->toArray(),
                'posts' => BlogPost::where('status', 'published')->latest('published_at')->take(3)->get()->toArray(),
                'testimonials' => Testimonial::where('status', 'approved')->orderBy('display_order')->get()->toArray(),
                'portfolioProjects' => PortfolioProject::where('is_published', true)
                    ->with(['portfolioImages.media', 'service'])
                    ->orderByDesc('created_at')
                    ->take(12)
                    ->get()
                    ->map(fn ($project) => [
                        'id' => $project->id,
                        'title' => $project->title,
                        'slug' => $project->slug,
                        'description' => $project->description,
                        'thumbnail' => $project->thumbnail_url ?: $project->portfolioImages->first()?->media?->s3_url,
                        'client' => $project->client_name,
                        'service' => $project->service ? ['id' => $project->service->id, 'title' => $project->service->title, 'slug' => $project->service->slug] : null,
                    ])->toArray(),
                'portfolioServices' => Service::where('is_published', true)->orderBy('display_order')->get(['id', 'title', 'slug'])->toArray(),
                'teamMembers' => TeamMember::with('media')->where('is_published', true)->orderBy('display_order')->orderByDesc('created_at')->take(8)->get()->map(fn ($m) => [
                    'id' => $m->id,
                    'name' => $m->name,
                    'title' => $m->title,
                    'bio' => $m->bio,
                    'photo' => $m->media?->s3_url,
                ])->toArray(),
            ];
        });

        return Inertia::render('Public/Homepage', $data);
    }
}
