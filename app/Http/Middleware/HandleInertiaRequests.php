<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function handle(Request $request, Closure $next): mixed
    {
        if ($request->hasSession()) {
            $session = $request->session();

            if ($session->has('success')) {
                Inertia::flash('toast', ['type' => 'success', 'message' => $session->get('success')]);
            } elseif ($session->has('error')) {
                Inertia::flash('toast', ['type' => 'error', 'message' => $session->get('error')]);
            }
        }

        return parent::handle($request, $next);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
