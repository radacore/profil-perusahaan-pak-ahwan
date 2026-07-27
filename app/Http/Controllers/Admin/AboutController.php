<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit(): Response
    {
        $page = Page::where('slug', 'about')->firstOrFail();

        return Inertia::render('Admin/About/Edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'mission' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'values' => ['nullable', 'array'],
            'values.*' => ['string', 'max:255'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:160'],
        ]);

        $page = Page::where('slug', 'about')->firstOrFail();
        $page->update($validated);

        return redirect()->back()->with('success', 'Halaman About berhasil diperbarui.');
    }
}
