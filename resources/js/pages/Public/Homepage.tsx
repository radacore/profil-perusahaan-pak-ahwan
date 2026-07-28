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
              <div className="mt-6 min-h-[7.5rem] sm:min-h-[8.75rem]">
                <p
                  className={`text-lg leading-relaxed text-[#E0F2FE] sm:text-xl transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                >
                  {subtitle}
                </p>
              </div>
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
              <div className="group relative mt-10 lg:mt-0">
                <img
                  src={settings.hero_image}
                  alt="Hero"
                  className="h-auto w-full rounded-lg object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ aspectRatio: '4 / 3' }}
                />

                <div className="absolute -top-6 -right-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-md animate-float">
                  <div className="rounded-lg bg-amber-500/20 p-2 text-amber-300">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">4.9/5</div>
                    <div className="text-xs text-white/60">Client Rating</div>
                  </div>
                </div>

                <div className="absolute top-1/4 -left-8 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '-2s' }}>
                  <div className="rounded-lg bg-blue-500/20 p-2 text-blue-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">100+</div>
                    <div className="text-xs text-white/60">Happy Clients</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 right-8 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '-1s' }}>
                  <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">24/7</div>
                    <div className="text-xs text-white/60">Live Support</div>
                  </div>
                </div>

                <div className="absolute bottom-12 -left-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '-4s' }}>
                  <div className="rounded-lg bg-violet-500/20 p-2 text-violet-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">10 Tahun</div>
                    <div className="text-xs text-white/60">Pengalaman</div>
                  </div>
                </div>
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
