import { Head, Link, usePage } from '@inertiajs/react';
import { sanitizeHtml } from '@/lib/sanitize';

interface ServiceDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
}

interface ServicesShowProps {
  service: ServiceDetail;
}

export default function ServicesShow({ service }: ServicesShowProps) {
  const plain = service.description ? service.description.replace(/<[^>]*>/g, '').slice(0, 155) : '';
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/services/${service.slug}` : `/services/${service.slug}`;

  return (
    <>
      <Head title={service.title}>
        {plain && <meta name="description" content={plain} />}
        <meta property="og:title" content={service.title} />
        {plain && <meta property="og:description" content={plain} />}
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonical} />
      </Head>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/services" className="text-sm text-[#E0F2FE] hover:text-white">
              Layanan
            </Link>
            <svg className="h-4 w-4 text-[#E0F2FE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm text-white">{service.title}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{service.title}</h1>
        </div>
      </section>

      {/* Service Detail */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-[#1F2937]">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#E0F2FE] text-[#1E3A8A]">
                  {service.icon ? (
                    <span className="text-3xl">{service.icon}</span>
                  ) : (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">{service.title}</h3>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="block w-full rounded-md bg-[#1E3A8A] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#1E3A8A]/90"
                  >
                    Konsultasi Gratis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
