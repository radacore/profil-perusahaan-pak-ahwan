import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

interface GalleryItem {
  id: number;
  alt_text: string | null;
  display_order: number | null;
  url: string;
}

interface ProjectDetail {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  client: string | null;
  project_date: string | null;
  service: { id: number; title: string; slug: string } | null;
  gallery: GalleryItem[];
}

interface Props {
  project: ProjectDetail;
}

export default function PortfolioShow({ project }: Props) {
  const { settings: sharedSettings } = usePage().props as unknown as { settings: Record<string, string> };
  const settings = sharedSettings || {};
  const plain = project.description ? project.description.replace(/<[^>]*>/g, '').slice(0, 155) : '';
  const desc = plain || settings.meta_description || '';
  const appUrl = (usePage().props as unknown as { appUrl?: string }).appUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const canonical = appUrl ? `${appUrl.replace(/\/$/, '')}/portfolio/${project.slug}` : `/portfolio/${project.slug}`;

  // Lightbox: click gallery image -> modal with prev/next + keyboard + swipe, no new tab
  const gallery = project.gallery || [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)), [gallery.length]);
  const goNext = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length)), [gallery.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  return (
    <>
      <Head title={project.title}>
        {desc && <meta name="description" content={desc} />}
        <meta property="og:title" content={project.title} />
        {desc && <meta property="og:description" content={desc} />}
        {project.thumbnail && <meta property="og:image" content={project.thumbnail} />}
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonical} />
      </Head>

      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/#portfolio" className="text-sm text-[#E0F2FE] hover:text-white">
              Portofolio
            </Link>
            <svg className="h-4 w-4 text-[#E0F2FE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm text-white">{project.title}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#E0F2FE]">
            {project.client && <span><span className="font-medium">Klien:</span> {project.client}</span>}
            {project.service && <Link href={`/#portfolio`} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium hover:bg-white/25">{project.service.title}</Link>}
            {project.project_date && (
              <span>{new Date(project.project_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {project.thumbnail && (
                <img src={project.thumbnail} alt={project.title} className="w-full rounded-lg object-cover shadow-sm" loading="eager" />
              )}

              {project.description ? (
                <div className="prose prose-lg mt-8 max-w-none text-[#1F2937]">
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.description) }} />
                </div>
              ) : (
                <p className="mt-8 text-[#6B7280]">Belum ada deskripsi untuk proyek ini.</p>
              )}

              {gallery.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold text-[#1F2937]">Galeri</h2>
                  <p className="mt-1 text-xs text-[#6B7280]">Klik gambar untuk melihat lebih besar — gunakan ← → atau geser untuk navigasi.</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {gallery.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openLightbox(idx)}
                        className="group block w-full overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] text-left transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
                      >
                        <img
                          src={item.url}
                          alt={item.alt_text || project.title}
                          loading="lazy"
                          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                <h3 className="text-lg font-semibold text-[#1F2937]">{project.title}</h3>
                {project.service && (
                  <p className="mt-3">
                    <span className="inline-flex rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-medium text-[#1E3A8A]">{project.service.title}</span>
                  </p>
                )}
                <dl className="mt-6 space-y-3 text-sm">
                  {project.client && (
                    <div>
                      <dt className="font-medium text-[#1F2937]">Klien</dt>
                      <dd className="text-[#6B7280]">{project.client}</dd>
                    </div>
                  )}
                  {project.project_date && (
                    <div>
                      <dt className="font-medium text-[#1F2937]">Tanggal</dt>
                      <dd className="text-[#6B7280]">{new Date(project.project_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    </div>
                  )}
                  {project.service && (
                    <div>
                      <dt className="font-medium text-[#1F2937]">Layanan</dt>
                      <dd className="text-[#6B7280]">{project.service.title}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/#portfolio" className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#1F2937] hover:bg-[#F3F4F6]">
                    ← Kembali ke Portofolio
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-white hover:bg-[#1E3A8A]/90">
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox modal — no new tab; next/prev, keyboard arrows, Esc, click outside, swipe */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Galeri"
          onClick={closeLightbox}
        >
          <div
            className="relative flex max-h-[90vh] max-w-5xl w-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              const el = e.currentTarget as HTMLDivElement & { _sx?: number };
              el._sx = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const el = e.currentTarget as HTMLDivElement & { _sx?: number };
              const sx = el._sx ?? 0;
              const dx = e.changedTouches[0].clientX - sx;
              if (Math.abs(dx) > 50) (dx > 0 ? goPrev() : goNext());
            }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Tutup"
              className="absolute -top-2 right-0 z-10 rounded-full bg-white/90 p-2 text-[#1F2937] shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white sm:-right-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={gallery[lightboxIndex].url}
              alt={gallery[lightboxIndex].alt_text || project.title}
              className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />

            <div className="mt-3 flex items-center gap-2 text-center text-sm text-white/90">
              {gallery[lightboxIndex].alt_text && <span>{gallery[lightboxIndex].alt_text}</span>}
              <span className="text-white/60">
                {lightboxIndex + 1} / {gallery.length}
              </span>
            </div>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Gambar sebelumnya"
                  className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#1F2937] shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white sm:flex sm:-left-4"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Gambar berikutnya"
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#1F2937] shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white sm:flex sm:-right-4"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
                  <button type="button" onClick={goPrev} className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#1F2937] shadow">‹ Sebelumnya</button>
                  <button type="button" onClick={goNext} className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#1F2937] shadow">Berikutnya ›</button>
                </div>

                <div className="mt-3 hidden items-center justify-center gap-1.5 sm:flex">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      aria-label={`Gambar ${i + 1}`}
                      aria-current={i === lightboxIndex ? 'true' : undefined}
                      className={`h-1.5 rounded-full transition-all ${i === lightboxIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
