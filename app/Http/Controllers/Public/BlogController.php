<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Blog/Index', [
            'posts' => BlogPost::where('status', 'published')
                ->with(['blogCategory', 'blogTags'])
                ->latest('published_at')
                ->paginate(10)
                ->through(fn ($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => Str::limit(strip_tags($post->content), 150),
                    'featured_image_url' => $post->featured_image_url,
                    'published_at' => $post->published_at,
                    'category' => $post->blogCategory,
                    'tags' => $post->blogTags,
                    'author' => $post->author,
                ]),
            'categories' => BlogCategory::whereHas('blogPosts', fn($q) => $q->where('status', 'published'))
                ->withCount(['blogPosts' => fn($q) => $q->where('status', 'published')])
                ->get(),
            'tags' => BlogTag::whereHas('blogPosts', fn($q) => $q->where('status', 'published'))
                ->withCount(['blogPosts' => fn($q) => $q->where('status', 'published')])
                ->get(),
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->where('status', 'published')
            ->with(['blogCategory', 'blogTags'])
            ->firstOrFail();

        return Inertia::render('Public/Blog/Show', [
            'post' => $post,
        ]);
    }
}
