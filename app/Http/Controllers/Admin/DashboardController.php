<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactSubmission;
use App\Models\PortfolioProject;
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
                'published_posts' => BlogPost::where('status', 'published')->count(),
                'total_projects' => PortfolioProject::count(),
                'total_submissions' => ContactSubmission::count(),
            ],
            'recent_submissions' => ContactSubmission::latest()
                ->take(5)
                ->get(),
        ]);
    }
}
