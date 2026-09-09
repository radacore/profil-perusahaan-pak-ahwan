import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getServiceIcon } from '@/lib/service-icons';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  icon_name: string | null;
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

interface PortfolioService {
  id: number;
  title: string;
  slug: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  client: string | null;
  service: PortfolioService | null;
}

interface TeamMember {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  photo: string | null;
}

interface HomepageProps {
  services: Service[];
  posts: Post[];
  testimonials: Testimonial[];
  portfolioProjects: PortfolioProject[];
  portfolioServices: PortfolioService[];
  teamMembers: TeamMember[];
}

function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group overflow-hidden rounded-lg border border-[#E5E7EB] bg-white text-left shadow-sm transition-all hover:shadow-md"
    >
      {project.thumbnail ? (
        <img src={project.thumbnail} alt={project.title} loading="lazy" className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex h-52 items-center justify-center bg-[#E0F2FE]">
          <svg className="h-16 w-16 text-[#1E3A8A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">{project.title}</h3>
        {project.client && <p className="mt-1 text-sm text-[#6B7280]">{project.client}</p>}
        {project.service && <span className="mt-3 inline-block rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-medium text-[#1E3A8A]">{project.service.title}</span>}
      </div>
    </Link>
  );
}

function PortfolioFilter({ projects, services }: { projects: PortfolioProject[]; services: PortfolioService[] }) {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? projects : projects.filter((p) => p.service?.slug === active);
  return (
    <>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setActive('all')} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === 'all' ? 'bg-[#1E3A8A] text-white' : 'bg-white text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'}`}>Semua</button>
        {services.map((s) => (
          <button key={s.id} type="button" onClick={() => setActive(s.slug)} className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === s.slug ? 'bg-[#1E3A8A] text-white' : 'bg-white text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'}`}>{s.title}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-center text-[#6B7280]">Tidak ada proyek untuk kategori ini.</p>}
    </>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-6 text-center">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="mx-auto h-28 w-28 rounded-full border-4 border-[#E0F2FE] object-cover"
          />
        ) : (
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#E0F2FE] bg-[#E0F2FE]">
            <span className="text-3xl font-bold text-[#1E3A8A]">{member.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">{member.name}</h3>
        {member.title && <p className="mt-1 text-sm font-medium text-[#1E3A8A]">{member.title}</p>}
        {member.bio && (
          <>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-3 inline-flex items-center text-sm font-medium text-[#0D9488] hover:text-[#0D9488]/80"
            >
              {expanded ? 'Tutup' : 'Lihat Bio'}
              <svg className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded && (
              <div className="mt-4 border-t border-[#E5E7EB] pt-4 text-left">
                <p className="text-sm leading-relaxed text-[#6B7280]">{member.bio}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
      <svg className="h-6 w-6 shrink-0 text-[#0D9488]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="mt-4 flex-1 text-sm italic leading-relaxed text-[#1F2937]">&ldquo;{testimonial.message}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.image_url ? (
          <img src={testimonial.image_url} alt={testimonial.client_name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A8A] text-sm font-bold text-white">
            {testimonial.client_name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-[#1F2937]">{testimonial.client_name}</p>
          {testimonial.client_title && <p className="text-xs text-[#6B7280]">{testimonial.client_title}</p>}
        </div>
      </div>
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const pages = chunk(testimonials, 3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setPage((p) => (p - 1 + pages.length) % pages.length), [pages.length]);
  const next = useCallback(() => setPage((p) => (p + 1) % pages.length), [pages.length]);

  useEffect(() => {
    if (pages.length <= 1 || paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [pages.length, paused, next]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  if (pages.length === 0) return <p className="mt-12 text-center text-[#6B7280]">Belum ada testimoni.</p>;
  if (pages.length === 1) {
    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) diff > 0 ? prev() : next();
        touchStartX.current = null;
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, idx) => (
            <div key={idx} className="w-full shrink-0">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {group.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
                {group.length < 3 && Array.from({ length: 3 - group.length }).map((_, i) => <div key={`empty-${i}`} className="hidden lg:block" />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Testimoni sebelumnya"
        className="absolute -left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 text-[#1F2937] shadow-md hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] md:flex lg:-left-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Testimoni berikutnya"
        className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 text-[#1F2937] shadow-md hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] md:flex lg:-right-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-8 flex items-center justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Halaman ${i + 1}`}
            aria-current={i === page ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all ${i === page ? 'w-7 bg-[#1E3A8A]' : 'w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]'}`}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        <button type="button" onClick={prev} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#1F2937] shadow-sm">‹ Sebelumnya</button>
        <button type="button" onClick={next} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#1F2937] shadow-sm">Berikutnya ›</button>
      </div>
    </div>
  );
}

function TeamSlider({ members }: { members: TeamMember[] }) {
  const pages = chunk(members, 3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => setPage((p) => (p - 1 + pages.length) % pages.length), [pages.length]);
  const next = useCallback(() => setPage((p) => (p + 1) % pages.length), [pages.length]);

  useEffect(() => {
    if (pages.length <= 1 || paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [pages.length, paused, next]);

  if (pages.length === 0) return <p className="mt-12 text-center text-[#6B7280]">Belum ada anggota tim.</p>;
  if (pages.length === 1) {
    return (
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <TeamMemberCard key={m.id} member={m} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) diff > 0 ? prev() : next();
        touchStartX.current = null;
      }}
    >
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((group, idx) => (
            <div key={idx} className="w-full shrink-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((m) => (
                  <TeamMemberCard key={m.id} member={m} />
                ))}
                {group.length < 3 && Array.from({ length: 3 - group.length }).map((_, i) => <div key={`empty-${i}`} className="hidden lg:block" />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Anggota sebelumnya"
        className="absolute -left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 text-[#1F2937] shadow-md hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] md:flex lg:-left-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Anggota berikutnya"
        className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white p-2.5 text-[#1F2937] shadow-md hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] md:flex lg:-right-4"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-8 flex items-center justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Halaman ${i + 1}`}
            aria-current={i === page ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all ${i === page ? 'w-7 bg-[#1E3A8A]' : 'w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]'}`}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        <button type="button" onClick={prev} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#1F2937] shadow-sm">‹ Sebelumnya</button>
        <button type="button" onClick={next} className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#1F2937] shadow-sm">Berikutnya ›</button>
      </div>
    </div>
  );
}

export default function Homepage({ services, posts, testimonials, portfolioProjects, portfolioServices, teamMembers }: HomepageProps) {
  const safeServices = Array.isArray(services) ? services : [];
  const safePosts = Array.isArray(posts) ? posts : [];
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const safePortfolioProjects = Array.isArray(portfolioProjects) ? portfolioProjects : [];
  const safePortfolioServices = Array.isArray(portfolioServices) ? portfolioServices : [];
  const safeTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const { settings: sharedSettings } = usePage().props as unknown as { settings: Record<string, string> };
  const settings = sharedSettings || {};
  const companyName = settings.company_name || 'CV Azhari Permata Mandiri';

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
  const metaDesc = settings.meta_description || subtitle.slice(0, 160);
  const canonical = typeof window !== 'undefined' ? window.location.origin + '/' : '/';

  return (
    <>
      <Head title={`Selamat Datang di ${companyName}`}>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={companyName} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonical} />
      </Head>

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
            {safeServices.map((service) => {
              const { Icon, colors } = getServiceIcon(service.icon_name);
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBox} ${colors.iconColor}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-[#1E3A8A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>
                </Link>
              );
            })}
          </div>
          {safeServices.length > 0 && (
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

      {/* Portfolio */}
      <section id="portfolio" className="scroll-mt-16 bg-[#F3F4F6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Portofolio</h2>
            <p className="mt-4 text-lg text-[#6B7280]">Karya terbaik yang telah kami kerjakan untuk klien.</p>
          </div>

          {safePortfolioServices.length > 0 && safePortfolioProjects.length > 0 && (
            <PortfolioFilter projects={safePortfolioProjects} services={safePortfolioServices} />
          )}

          {safePortfolioProjects.length === 0 ? (
            <p className="mt-12 text-center text-[#6B7280]">Belum ada proyek portofolio.</p>
          ) : safePortfolioServices.length === 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {safePortfolioProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Team — 3 per halaman, slider ke samping jika > 3 */}
      <section id="team" className="scroll-mt-16 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Tim Kami</h2>
            <p className="mt-4 text-lg text-[#6B7280]">Para profesional di balik {settings.company_name || 'CV Azhari Permata Mandiri'}.</p>
          </div>
          <TeamSlider members={safeTeamMembers} />
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
            {safePosts.map((post) => (
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
          {safePosts.length > 0 && (
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

      {/* Testimonials — Klien Kami: 3 per halaman, slider ke samping jika > 3 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1F2937]">Apa Kata Klien Kami</h2>
            <p className="mt-4 text-lg text-[#6B7280]">Testimoni dari klien yang telah mempercayai layanan kami.</p>
          </div>
          <TestimonialsSlider testimonials={safeTestimonials} />
        </div>
      </section>
    </>
  );
}
