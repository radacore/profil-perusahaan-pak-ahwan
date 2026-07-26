import { Head, Link } from '@inertiajs/react';

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  client: string;
}

interface ServiceDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
}

interface ServicesShowProps {
  service: ServiceDetail;
  relatedProjects: PortfolioProject[];
}

export default function ServicesShow({ service, relatedProjects }: ServicesShowProps) {
  return (
    <>
      <Head title={service.title} />

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
                <div dangerouslySetInnerHTML={{ __html: service.description }} />
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

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-[#F3F4F6] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1F2937]">Proyek Terkait</h2>
            <p className="mt-2 text-[#6B7280]">Portofolio proyek yang terkait dengan layanan ini.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group rounded-lg border border-[#E5E7EB] bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
                >
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#E0F2FE]">
                      <svg className="h-12 w-12 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">{project.title}</h3>
                    <p className="mt-1 text-sm text-[#6B7280]">{project.client}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
