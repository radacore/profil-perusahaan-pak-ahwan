import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';


interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  // Page data can be passed from backend if needed
}

export default function Contact({}: ContactProps) {
  const settings = (usePage().props as any).settings || {};
  const { data, setData, post, processing, errors, reset } = useForm<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => {
        setSubmitted(true);
        reset();
      },
    });
  }

  return (
    <>
      <Head title="Kontak" />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Hubungi Kami</h1>
          <p className="mt-2 text-[#E0F2FE]">
            Punya pertanyaan atau ingin bekerja sama? Silakan hubungi kami.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-lg border border-[#10B981] bg-green-50 p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">Pesan Terkirim!</h3>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    Terima kasih telah menghubungi kami. Tim kami akan merespons pesan Anda secepatnya.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-white hover:bg-[#1E3A8A]/90"
                  >
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#1F2937]">
                        Nama Lengkap <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#1F2937] placeholder-[#6B7280] focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                        placeholder="Nama Anda"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-[#EF4444]">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
                        Email <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#1F2937] placeholder-[#6B7280] focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                        placeholder="email@anda.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#EF4444]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#1F2937]">
                      Subjek
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={data.subject}
                      onChange={(e) => setData('subject', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#1F2937] placeholder-[#6B7280] focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                      placeholder="Subjek pesan"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-[#EF4444]">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1F2937]">
                      Pesan <span className="text-[#EF4444]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm text-[#1F2937] placeholder-[#6B7280] focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-[#EF4444]">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-[#1E3A8A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1E3A8A]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                  <h3 className="text-lg font-semibold text-[#1F2937]">Informasi Kontak</h3>
                  <dl className="mt-4 space-y-4">
                    {settings.contact_address && (
                      <div className="flex gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <dt className="text-sm font-medium text-[#1F2937]">Alamat</dt>
                          <dd className="mt-1 text-sm text-[#6B7280]">{settings.contact_address}</dd>
                        </div>
                      </div>
                    )}
                    {settings.contact_phone && (
                      <div className="flex gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <dt className="text-sm font-medium text-[#1F2937]">Telepon</dt>
                          <dd className="mt-1 text-sm text-[#6B7280]">{settings.contact_phone}</dd>
                        </div>
                      </div>
                    )}
                    {settings.contact_email && (
                      <div className="flex gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1E3A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <dt className="text-sm font-medium text-[#1F2937]">Email</dt>
                          <dd className="mt-1 text-sm text-[#6B7280]">{settings.contact_email}</dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-6">
                  <h3 className="text-lg font-semibold text-[#1F2937]">Ikuti Kami</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {settings.social_facebook && (
                      <a
                        href={settings.social_facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md bg-[#1E3A8A] px-3 py-2 text-xs font-medium text-white hover:bg-[#1E3A8A]/90"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                      </a>
                    )}
                    {settings.social_linkedin && (
                      <a
                        href={settings.social_linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md bg-[#1E3A8A] px-3 py-2 text-xs font-medium text-white hover:bg-[#1E3A8A]/90"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {settings.social_instagram && (
                      <a
                        href={settings.social_instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-md bg-[#1E3A8A] px-3 py-2 text-xs font-medium text-white hover:bg-[#1E3A8A]/90"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
