import { Head, Link, usePage } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  category: Category | null;
}

interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

interface BlogIndexProps {
  posts: PaginatedData<Post>;
  categories: Category[];
  selectedCategory: string | null;
}

export default function BlogIndex({ posts, categories, selectedCategory }: BlogIndexProps) {
  const settings = (usePage().props as any).settings || {};

  return (
    <>
      <Head title="Blog" />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
          <p className="mt-2 text-[#E0F2FE]">
            Artikel dan wawasan dari {settings.company_name || 'ProfilKorp'}.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Posts List */}
            <div className="lg:col-span-2">
              {posts.data.length > 0 ? (
                <div className="space-y-8">
                  {posts.data.map((post) => (
                    <article
                      key={post.id}
                      className="group rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        {post.category && (
                          <Link
                            href={`/blog?category=${post.category.slug}`}
                            className="rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-medium text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors"
                          >
                            {post.category.name}
                          </Link>
                        )}
                        <span className="text-xs text-[#6B7280]">
                          {new Date(post.published_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="mt-3 text-xl font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="mt-2 text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-flex items-center text-sm font-medium text-[#1E3A8A] hover:text-[#1E3A8A]/80"
                      >
                        Baca Selengkapnya
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-lg text-[#6B7280]">Belum ada artikel.</p>
                </div>
              )}

              {/* Pagination */}
              {posts.last_page > 1 && (
                <div className="mt-10 flex justify-center">
                  <nav className="flex items-center gap-1">
                    {posts.links.map((link, index) => {
                      if (!link.url) {
                        return (
                          <span
                            key={index}
                            className="rounded-md px-3 py-2 text-sm text-[#6B7280] cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        );
                      }

                      return (
                        <Link
                          key={index}
                          href={link.url}
                          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            link.active
                              ? 'bg-[#1E3A8A] text-white'
                              : 'text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
                          }`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      );
                    })}
                  </nav>
                </div>
              )}
            </div>

            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                <h3 className="text-lg font-semibold text-[#1F2937]">Kategori</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/blog"
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        !selectedCategory
                          ? 'bg-[#1E3A8A] text-white'
                          : 'text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
                      }`}
                    >
                      Semua ({posts.total})
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/blog?category=${category.slug}`}
                        className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-[#1E3A8A] text-white'
                            : 'text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
                        }`}
                      >
                        {category.name} ({category.posts_count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
