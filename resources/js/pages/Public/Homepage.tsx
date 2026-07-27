import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  icon_url: string | null;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  blog_category_id: number | null;
}

interface Testimonial {
  id: number;
  client_name: string;
  client_title: string | null;
  message: string;
  image_url: string | null;
}

interface HomepageProps {
  services: Service[];
  posts: Post[];
  testimonials: Testimonial[];
}

export default function Homepage({ services, posts, testimonials }: HomepageProps) {
  const settings = (usePage().props as any).settings || {};
  const companyName = settings.company_name || 'ProfilKorp';

  const subtitles = [settings.hero_subtitle_1, settings.hero_subtitle_2, settings.hero_subtitle_3].filter(Boolean);
  const [subIndex, setSubIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (subtitles.length <= 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSubIndex((i) => (i + 1) % subtitles.length);
        setFade(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  const subtitle = subtitles[subIndex] || settings.company_tagline || 'Solusi profesional untuk kebutuhan bisnis Anda dengan layanan terpercaya dan inovatif.';

  return (
    <>
      <Head title={`Selamat Datang di ${companyName}`} />

      {/* Hero Banner */}
      <section className="relative flex min-h-screen items-center bg-gradient-to-br from-[#1E3A8A] via-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`${settings.hero_image ? 'grid lg:grid-cols-2 gap-12 items-center' : ''}`}>
            <div className={settings.hero_image ? '' : 'max-w-3xl'}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {settings.hero_heading || `Selamat Datang di ${companyName}`}
              </h1>
              <p
                className={`mt-6 text-lg leading-relaxed text-[#E0F2FE] sm:text-xl transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
              >
                {subtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={settings.hero_cta_url || '/contact'}
                  className="inline-flex items-center rounded-md bg-[#0D9488] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0D9488]/90"
                >
                  {settings.hero_cta_text || 'Hubungi Kami'}
                </Link>
                <Link
                  href={settings.hero_cta_secondary_url || '/services'}
                  className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {settings.hero_cta_secondary_text || 'Lihat Layanan'}
                </Link>
              </div>
            </div>
            {settings.hero_image && (
              <div className="mt-10 lg:mt-0">
                <img
                  src={settings.hero_image}
                  alt="Hero"
                  className="h-auto w-full rounded-lg object-cover shadow-2xl"
                  style={{ aspectRatio: '4 / 3' }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Featured Services */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Layanan Kami</h2>
            <p className="mt-4 text-lg text-[#6B7280]">
              Berbagai solusi profesional untuk membantu bisnis Anda berkembang.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#1E3A8A]/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E0F2FE] text-[#1E3A8A]">
                  {service.icon_url ? (
                    <img src={service.icon_url} alt="" className="h-8 w-8 object-contain" />
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280] line-clamp-3">
                  {service.short_description}
                </p>
              </Link>
            ))}
          </div>
          {services.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-semibold text-[#1E3A8A] hover:text-[#1E3A8A]/80"
              >
                Lihat Semua Layanan
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-[#F3F4F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Artikel Terbaru</h2>
            <p className="mt-4 text-lg text-[#6B7280]">
              Informasi dan wawasan terbaru dari tim kami.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280] line-clamp-3">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                <p className="mt-4 text-xs text-[#6B7280]">
                  {new Date(post.published_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
          {posts.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-semibold text-[#1E3A8A] hover:text-[#1E3A8A]/80"
              >
                Baca Semua Artikel
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Apa Kata Klien Kami</h2>
            <p className="mt-4 text-lg text-[#6B7280]">
              Testimoni dari klien yang telah mempercayai layanan kami.
            </p>
          </div>
          {testimonials.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6"
                >
                  <svg className="h-6 w-6 text-[#0D9488]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mt-4 text-sm italic text-[#1F2937]">
                    &ldquo;{testimonial.message}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A8A] text-sm font-bold text-white">
                      {testimonial.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937]">{testimonial.client_name}</p>
                      {testimonial.client_title && (
                        <p className="text-xs text-[#6B7280]">{testimonial.client_title}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-[#6B7280]">Belum ada testimoni.</p>
          )}
        </div>
      </section>
    </>
  );
}
