<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Team', [
            'members' => TeamMember::where('is_published', true)
                ->orderBy('display_order')
                ->get(),
        ]);
    }
}
