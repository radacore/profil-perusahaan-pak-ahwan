import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';


interface Service {
  id: number;
  title: string;
  slug: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  client: string;
  service: Service | null;
}

interface PaginatedProjects {
  data: PortfolioProject[];
  current_page: number;
  last_page: number;
}

interface PortfolioIndexProps {
  projects: PaginatedProjects;
  services: Service[];
}

export default function PortfolioIndex({ projects, services }: PortfolioIndexProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const settings = (usePage().props as any).settings || {};

  const filteredProjects =
    activeFilter === 'all'
      ? projects.data
      : projects.data.filter((p) => p.service?.slug === activeFilter);

  return (
    <>
      <Head title="Portofolio" />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Portofolio</h1>
          <p className="mt-2 text-[#E0F2FE]">
            Karya terbaik dari {settings.company_name || 'ProfilKorp'}.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
              }`}
            >
              Semua
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveFilter(service.slug)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === service.slug
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group rounded-lg border border-[#E5E7EB] bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
                >
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-[#E0F2FE]">
                      <svg className="h-16 w-16 text-[#1E3A8A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#1E3A8A]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#6B7280]">{project.client}</p>
                    {project.service && (
                      <span className="mt-3 inline-block rounded-full bg-[#E0F2FE] px-3 py-1 text-xs font-medium text-[#1E3A8A]">
                        {project.service.title}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-[#6B7280]">Tidak ada proyek untuk kategori ini.</p>
            </div>
          )}

          {projects.last_page > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {projects.current_page > 1 && (
                <Link
                  href={`/portfolio?page=${projects.current_page - 1}`}
                  className="rounded-md border border-[#E5E7EB] px-4 py-2 text-sm text-[#6B7280] hover:bg-[#F3F4F6]"
                >
                  Sebelumnya
                </Link>
              )}
              {projects.current_page < projects.last_page && (
                <Link
                  href={`/portfolio?page=${projects.current_page + 1}`}
                  className="rounded-md border border-[#E5E7EB] px-4 py-2 text-sm text-[#6B7280] hover:bg-[#F3F4F6]"
                >
                  Selanjutnya
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
