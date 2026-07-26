import { Head, Link } from '@inertiajs/react';

interface PortfolioDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  project_date: string;
  thumbnail: string | null;
  images: string[];
}

interface PortfolioShowProps {
  project: PortfolioDetail;
}

export default function PortfolioShow({ project }: PortfolioShowProps) {
  return (
    <>
      <Head title={project.title} />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/portfolio" className="text-sm text-[#E0F2FE] hover:text-white">
              Portofolio
            </Link>
            <svg className="h-4 w-4 text-[#E0F2FE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm text-white">{project.title}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{project.title}</h1>
        </div>
      </section>

      {/* Project Detail */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {project.thumbnail && (
                    <div className="sm:col-span-2 overflow-hidden rounded-lg">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-80 w-full object-cover"
                      />
                    </div>
                  )}
                  {project.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        className="h-56 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none text-[#1F2937]">
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                <h3 className="text-lg font-semibold text-[#1F2937]">Informasi Proyek</h3>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-[#6B7280]">Klien</dt>
                    <dd className="mt-1 text-sm text-[#1F2937]">{project.client}</dd>
                  </div>
                  {project.project_date && (
                    <div>
                      <dt className="text-sm font-medium text-[#6B7280]">Tanggal</dt>
                      <dd className="mt-1 text-sm text-[#1F2937]">
                        {new Date(project.project_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="block w-full rounded-md bg-[#1E3A8A] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#1E3A8A]/90"
                  >
                    Hubungi Kami
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
