<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactSubmission;
use App\Models\Media;
use App\Models\Page;
use App\Models\PortfolioProject;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_posts' => BlogPost::count(),
                'total_projects' => PortfolioProject::count(),
                'total_services' => Service::count(),
                'total_team' => TeamMember::count(),
                'total_testimonials' => Testimonial::count(),
                'total_media' => Media::count(),
                'total_submissions' => ContactSubmission::count(),
                'total_pages' => Page::count(),
            ],
            'quick_stats' => [
                'draft_posts' => BlogPost::where('status', 'draft')->count(),
                'pending_testimonials' => Testimonial::where('status', 'pending')->count(),
                'new_submissions' => ContactSubmission::where('status', 'new')->count(),
            ],
            'recent_posts' => BlogPost::select('id', 'title', 'status', 'created_at')
                ->latest()
                ->take(5)
                ->get(),
            'recent_projects' => PortfolioProject::with('service:id,title')
                ->select('id', 'title', 'client_name', 'is_published', 'project_date', 'created_at')
                ->latest()
                ->take(5)
                ->get(),
            'recent_submissions' => ContactSubmission::latest()
                ->take(5)
                ->get(),
        ]);
    }
}
