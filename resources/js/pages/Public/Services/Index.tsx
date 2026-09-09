import { Head, Link, usePage } from '@inertiajs/react';
import { getServiceIcon } from '@/lib/service-icons';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  icon_name: string | null;
}

interface ServicesIndexProps {
  services: Service[];
}

export default function ServicesIndex({ services }: ServicesIndexProps) {
  const { settings: sharedSettings } = usePage().props as unknown as { settings: Record<string, string> };
  const settings = sharedSettings || {};
  const desc = settings.meta_description || 'Solusi profesional yang kami tawarkan untuk bisnis Anda.';
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/services` : '/services';

  return (
    <>
      <Head title="Layanan">
        <meta name="description" content={desc} />
        <meta property="og:title" content="Layanan" />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonical} />
      </Head>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Layanan</h1>
          <p className="mt-2 text-[#E0F2FE]">Solusi profesional yang kami tawarkan untuk bisnis Anda.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
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
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                      {service.short_description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-[#1E3A8A] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5">
                      Selengkapnya
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[#6B7280]">Belum ada layanan yang tersedia.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
