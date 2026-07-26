<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::with('media')
            ->where('is_published', true)
            ->latest()
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'name' => $m->name,
                'title' => $m->title,
                'bio' => $m->bio,
                'photo' => $m->media?->s3_url,
            ]);

        return Inertia::render('Public/Team', [
            'teamMembers' => $teamMembers,
        ]);
    }
}
