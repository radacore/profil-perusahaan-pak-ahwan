import { Head, Link } from '@inertiajs/react';

interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

interface PostDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string;
  author: string | null;
  category: PostCategory | null;
  tags: string[];
}

interface BlogShowProps {
  post: PostDetail;
}

export default function BlogShow({ post }: BlogShowProps) {
  return (
    <>
      <Head title={post.title} />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-sm text-[#E0F2FE] hover:text-white">
              Blog
            </Link>
            <svg className="h-4 w-4 text-[#E0F2FE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm text-white">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
              {post.author && (
                <span className="font-medium text-[#1F2937]">
                  Oleh {post.author}
                </span>
              )}
              <span>
                {new Date(post.published_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {post.category && (
                <Link
                  href={`/blog?category=${post.category.slug}`}
                  className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-medium text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors"
                >
                  {post.category.name}
                </Link>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg mt-8 max-w-none text-[#1F2937]">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 border-t border-[#E5E7EB] pt-8">
                <h3 className="text-sm font-semibold text-[#1F2937]">Tag:</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#6B7280]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back Link */}
            <div className="mt-10 border-t border-[#E5E7EB] pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80"
              >
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
