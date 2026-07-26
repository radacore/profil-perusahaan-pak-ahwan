<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Services\ImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function __construct(
        protected ImageService $imageService,
    ) {
        $this->middleware('auth');
    }

    public function index(Request $request): Response
    {
        $query = BlogPost::with('blogCategory', 'blogTags');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Blog/Index', [
            'posts' => $query->latest()
                ->paginate(10)
                ->through(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'status' => $post->status,
                    'author' => $post->author,
                    'published_at' => $post->published_at,
                    'category' => $post->blogCategory?->only(['id', 'name']),
                    'created_at' => $post->created_at,
                ]),
            'filters' => $request->only(['status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Create', [
            'categories' => BlogCategory::orderBy('name')->get(),
            'tags' => BlogTag::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:blog_posts,slug'],
            'content' => ['required', 'string'],
            'author' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:draft,published'],
            'blog_category_id' => ['nullable', 'exists:blog_categories,id'],
            'tags' => ['nullable', 'array'],
            'tags.*.id' => ['nullable', 'exists:blog_tags,id'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:160'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = str($validated['title'])->slug();
        }

        $post = BlogPost::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'author' => $validated['author'],
            'status' => $validated['status'],
            'blog_category_id' => $validated['blog_category_id'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        if (!empty($validated['tags'])) {
            $tagIds = collect($validated['tags'])->pluck('id')->filter();
            $post->blogTags()->sync($tagIds);
        }

        return redirect()->route('admin.blog.index')->with('success', 'Blog post berhasil dibuat.');
    }

    public function edit($id): Response
    {
        $post = BlogPost::with('blogTags')->findOrFail($id);

        return Inertia::render('Admin/Blog/Edit', [
            'post' => $post,
            'categories' => BlogCategory::orderBy('name')->get(),
            'tags' => BlogTag::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $post = BlogPost::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:blog_posts,slug,' . $id],
            'content' => ['required', 'string'],
            'author' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:draft,published,archived'],
            'blog_category_id' => ['nullable', 'exists:blog_categories,id'],
            'tags' => ['nullable', 'array'],
            'tags.*.id' => ['nullable', 'exists:blog_tags,id'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:160'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = str($validated['title'])->slug();
        }

        $post->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'author' => $validated['author'],
            'status' => $validated['status'],
            'blog_category_id' => $validated['blog_category_id'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'published_at' => $validated['status'] === 'published' && !$post->published_at ? now() : $post->published_at,
        ]);

        if (isset($validated['tags'])) {
            $tagIds = collect($validated['tags'])->pluck('id')->filter();
            $post->blogTags()->sync($tagIds);
        }

        return redirect()->route('admin.blog.index')->with('success', 'Blog post berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Blog post berhasil dihapus.');
    }

    public function uploadFeaturedImage(Request $request, $id): RedirectResponse
    {
        $request->validate(['image' => ['required', 'image', 'max:5120']]);

        $data = $this->imageService->convertToWebp($request->file('image'), 'featured-images');

        $post = BlogPost::findOrFail($id);
        $post->update(['featured_image_url' => $data['s3_url']]);

        return redirect()->back()->with('success', 'Gambar unggulan berhasil diupload.');
    }

    public function categories(): Response
    {
        return Inertia::render('Admin/Blog/Categories', [
            'categories' => BlogCategory::withCount('blogPosts')->get(),
        ]);
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        BlogCategory::create([
            'name' => $validated['name'],
            'slug' => str($validated['name'])->slug(),
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil dibuat.');
    }

    public function destroyCategory($id): RedirectResponse
    {
        BlogCategory::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Kategori berhasil dihapus.');
    }

    public function tags(): Response
    {
        return Inertia::render('Admin/Blog/Tags', [
            'tags' => BlogTag::withCount('blogPosts')->get(),
        ]);
    }

    public function storeTag(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        BlogTag::create([
            'name' => $validated['name'],
            'slug' => str($validated['name'])->slug(),
        ]);

        return redirect()->back()->with('success', 'Tag berhasil dibuat.');
    }

    public function destroyTag($id): RedirectResponse
    {
        BlogTag::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Tag berhasil dihapus.');
    }
}
