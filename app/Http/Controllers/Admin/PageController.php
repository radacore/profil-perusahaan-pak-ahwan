<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentVersion;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::all(),
        ]);
    }

    public function edit($slug): Response
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        return Inertia::render('Admin/Pages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:160'],
        ]);

        $page = Page::findOrFail($id);

        ContentVersion::create([
            'page_id' => $page->id,
            'content' => $page->content,
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'admin_id' => auth()->id(),
            'change_notes' => $request->input('change_notes'),
        ]);

        $page->update($validated);

        return redirect()->back()->with('success', 'Halaman berhasil diperbarui.');
    }

    public function versions($id): Response
    {
        $page = Page::findOrFail($id);
        $versions = ContentVersion::where('page_id', $page->id)
            ->with('admin:id,name')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Pages/Versions', [
            'page' => $page,
            'versions' => $versions,
        ]);
    }

    public function showVersion($id, $versionId): Response
    {
        $version = ContentVersion::where('page_id', $id)
            ->with('admin:id,name')
            ->findOrFail($versionId);

        return Inertia::render('Admin/Pages/ShowVersion', [
            'version' => $version,
        ]);
    }

    public function rollback(Request $request, $id, $versionId): RedirectResponse
    {
        $page = Page::findOrFail($id);
        $version = ContentVersion::where('page_id', $id)->findOrFail($versionId);

        ContentVersion::create([
            'page_id' => $page->id,
            'content' => $page->content,
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'admin_id' => auth()->id(),
            'change_notes' => 'Rollback ke versi #' . $version->id,
        ]);

        $page->update([
            'content' => $version->content,
            'meta_title' => $version->meta_title,
            'meta_description' => $version->meta_description,
        ]);

        return redirect()->back()->with('success', 'Halaman berhasil dikembalikan ke versi sebelumnya.');
    }
}
