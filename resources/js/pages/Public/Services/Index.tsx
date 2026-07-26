import { Head, Link } from '@inertiajs/react';

interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  icon: string | null;
}

interface ServicesIndexProps {
  services: Service[];
}

export default function ServicesIndex({ services }: ServicesIndexProps) {
  return (
    <>
      <Head title="Layanan" />

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
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-[#1E3A8A]/20"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#E0F2FE] text-[#1E3A8A]">
                    {service.icon ? (
                      <span className="text-3xl">{service.icon}</span>
                    ) : (
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                    {service.short_description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-[#1E3A8A] opacity-0 transition-opacity group-hover:opacity-100">
                    Selengkapnya
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
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
