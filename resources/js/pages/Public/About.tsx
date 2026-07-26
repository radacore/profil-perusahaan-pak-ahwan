import { Head, usePage } from '@inertiajs/react';

interface AboutPage {
  title: string;
  content: string;
  mission: string;
  vision: string;
  values: string[];
}

interface AboutProps {
  page: AboutPage;
}

export default function About({ page }: AboutProps) {
  const settings = (usePage().props as any).settings || {};

  return (
    <>
      <Head title={page.title || 'Tentang Kami'} />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{page.title}</h1>
          <p className="mt-2 text-[#E0F2FE]">Mengenal lebih dekat {settings.company_name || 'ProfilKorp'}</p>
        </div>
      </section>

      {/* Page Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#1F2937]">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F3F4F6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">Misi</h2>
              <p className="mt-4 text-[#1F2937] leading-relaxed">{page.mission}</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">Visi</h2>
              <p className="mt-4 text-[#1F2937] leading-relaxed">{page.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      {page.values && page.values.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1F2937]">Nilai-Nilai Kami</h2>
              <p className="mt-4 text-lg text-[#6B7280]">Prinsip yang menjadi dasar setiap langkah kami.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2FE] text-lg font-bold text-[#1E3A8A]">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 font-semibold text-[#1F2937]">{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
