import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { url } = usePage();
  const { auth } = usePage().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const settings = (usePage().props as any).settings || {};

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = url === '/';
  const transparent = isHome && !scrolled;

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang' },
    { href: '/services', label: 'Layanan' },
    { href: '/portfolio', label: 'Portofolio' },
    { href: '/team', label: 'Tim' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          transparent
            ? 'border-transparent bg-transparent shadow-none'
            : 'border-[#E5E7EB] bg-white shadow-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-[#1E3A8A]'
              }`}
            >
              {settings.company_name || 'ProfilKorp'}
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  transparent
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {auth?.user && (
              <Link
                href={'/' + (import.meta.env.VITE_ADMIN_PATH || 'dashboard-admin')}
                className={`ml-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  transparent
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-md p-2 transition-colors duration-300 md:hidden ${
              transparent ? 'text-white hover:bg-white/10' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-[#E5E7EB] bg-white md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-[#1F2937] hover:bg-[#E0F2FE] hover:text-[#1E3A8A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#E5E7EB] bg-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">{settings.company_name || 'ProfilKorp'}</h3>
              <p className="mt-2 text-sm text-[#D1D5DB]">Solusi profesional untuk kebutuhan bisnis Anda.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Kontak</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#D1D5DB]">
                <li>{settings.contact_address}</li>
                <li>{settings.contact_phone}</li>
                <li>{settings.contact_email}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ikuti Kami</h3>
              <div className="mt-2 flex gap-4">
                {settings.social_facebook && <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="text-[#D1D5DB] hover:text-white">Facebook</a>}
                {settings.social_linkedin && <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-[#D1D5DB] hover:text-white">LinkedIn</a>}
                {settings.social_instagram && <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="text-[#D1D5DB] hover:text-white">Instagram</a>}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#374151] pt-8 text-center text-sm text-[#D1D5DB]">
            &copy; {new Date().getFullYear()} {settings.company_name || 'ProfilKorp'}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
