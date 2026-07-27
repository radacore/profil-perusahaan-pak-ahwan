import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

interface Settings {
  company_name: string;
  company_tagline: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_twitter: string;
  meta_title: string;
  meta_description: string;
  hero_heading: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_url: string;
  hero_cta_secondary_text: string;
  hero_cta_secondary_url: string;
}

interface Props {
  settings: Settings;
}

export default function SettingsIndex({ settings }: Props) {
  const company = useForm({
    company_name: settings.company_name || '',
    company_tagline: settings.company_tagline || '',
    company_description: settings.company_description || '',
  });

  const contact = useForm({
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    contact_address: settings.contact_address || '',
  });

  const social = useForm({
    social_facebook: settings.social_facebook || '',
    social_instagram: settings.social_instagram || '',
    social_linkedin: settings.social_linkedin || '',
    social_twitter: settings.social_twitter || '',
  });

  const seo = useForm({
    meta_title: settings.meta_title || '',
    meta_description: settings.meta_description || '',
  });

  const hero = useForm({
    hero_heading: settings.hero_heading || '',
    hero_subtitle: settings.hero_subtitle || '',
  });

  const cta = useForm({
    hero_cta_text: settings.hero_cta_text || '',
    hero_cta_url: settings.hero_cta_url || '',
    hero_cta_secondary_text: settings.hero_cta_secondary_text || '',
    hero_cta_secondary_url: settings.hero_cta_secondary_url || '',
  });

  return (
    <>
      <Head title="Pengaturan" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Pengaturan</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Kelola pengaturan global situs</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); company.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Perusahaan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="company_name">Nama Perusahaan</Label>
                  <Input
                    id="company_name"
                    value={company.data.company_name}
                    onChange={(e) => company.setData('company_name', e.target.value)}
                  />
                  <InputError message={company.errors.company_name} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company_tagline">Tagline</Label>
                  <Input
                    id="company_tagline"
                    value={company.data.company_tagline}
                    onChange={(e) => company.setData('company_tagline', e.target.value)}
                  />
                  <InputError message={company.errors.company_tagline} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company_description">Deskripsi Perusahaan</Label>
                  <textarea
                    id="company_description"
                    rows={4}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={company.data.company_description}
                    onChange={(e) => company.setData('company_description', e.target.value)}
                  />
                  <InputError message={company.errors.company_description} />
                </div>

                <Button type="submit" disabled={company.processing}>
                  {company.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>

          <Card>
            <form onSubmit={(e) => { e.preventDefault(); contact.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact_email">Email Kontak</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={contact.data.contact_email}
                    onChange={(e) => contact.setData('contact_email', e.target.value)}
                  />
                  <InputError message={contact.errors.contact_email} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact_phone">Telepon</Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={contact.data.contact_phone}
                    onChange={(e) => contact.setData('contact_phone', e.target.value)}
                  />
                  <InputError message={contact.errors.contact_phone} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact_address">Alamat</Label>
                  <textarea
                    id="contact_address"
                    rows={3}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={contact.data.contact_address}
                    onChange={(e) => contact.setData('contact_address', e.target.value)}
                  />
                  <InputError message={contact.errors.contact_address} />
                </div>

                <Button type="submit" disabled={contact.processing}>
                  {contact.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); social.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">Media Sosial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input
                    id="social_facebook"
                    type="url"
                    value={social.data.social_facebook}
                    onChange={(e) => social.setData('social_facebook', e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                  <InputError message={social.errors.social_facebook} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="social_instagram">Instagram</Label>
                  <Input
                    id="social_instagram"
                    type="url"
                    value={social.data.social_instagram}
                    onChange={(e) => social.setData('social_instagram', e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                  <InputError message={social.errors.social_instagram} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="social_linkedin">LinkedIn</Label>
                  <Input
                    id="social_linkedin"
                    type="url"
                    value={social.data.social_linkedin}
                    onChange={(e) => social.setData('social_linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/..."
                  />
                  <InputError message={social.errors.social_linkedin} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="social_twitter">Twitter / X</Label>
                  <Input
                    id="social_twitter"
                    type="url"
                    value={social.data.social_twitter}
                    onChange={(e) => social.setData('social_twitter', e.target.value)}
                    placeholder="https://twitter.com/..."
                  />
                  <InputError message={social.errors.social_twitter} />
                </div>

                <Button type="submit" disabled={social.processing}>
                  {social.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>

          <Card>
            <form onSubmit={(e) => { e.preventDefault(); seo.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">SEO Global</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="meta_title">Meta Title Default</Label>
                  <Input
                    id="meta_title"
                    value={seo.data.meta_title}
                    onChange={(e) => seo.setData('meta_title', e.target.value)}
                  />
                  <InputError message={seo.errors.meta_title} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="meta_description">Meta Description Default</Label>
                  <textarea
                    id="meta_description"
                    rows={3}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={seo.data.meta_description}
                    onChange={(e) => seo.setData('meta_description', e.target.value)}
                  />
                  <InputError message={seo.errors.meta_description} />
                </div>

                <Button type="submit" disabled={seo.processing}>
                  {seo.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={(e) => { e.preventDefault(); hero.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="hero_heading">Judul Hero</Label>
                  <Input
                    id="hero_heading"
                    value={hero.data.hero_heading}
                    onChange={(e) => hero.setData('hero_heading', e.target.value)}
                    placeholder="Selamat Datang di ProfilKorp"
                  />
                  <InputError message={hero.errors.hero_heading} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="hero_subtitle">Subtitle Hero</Label>
                  <textarea
                    id="hero_subtitle"
                    rows={3}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={hero.data.hero_subtitle}
                    onChange={(e) => hero.setData('hero_subtitle', e.target.value)}
                    placeholder="Solusi profesional untuk kebutuhan bisnis Anda..."
                  />
                  <InputError message={hero.errors.hero_subtitle} />
                </div>

                <Button type="submit" disabled={hero.processing}>
                  {hero.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>

          <Card>
            <form onSubmit={(e) => { e.preventDefault(); cta.put('/dashboard-admin/settings'); }}>
              <CardHeader>
                <CardTitle className="text-lg">Tombol CTA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="hero_cta_text">Teks Tombol Utama</Label>
                  <Input
                    id="hero_cta_text"
                    value={cta.data.hero_cta_text}
                    onChange={(e) => cta.setData('hero_cta_text', e.target.value)}
                    placeholder="Hubungi Kami"
                  />
                  <InputError message={cta.errors.hero_cta_text} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="hero_cta_url">URL Tombol Utama</Label>
                  <Input
                    id="hero_cta_url"
                    value={cta.data.hero_cta_url}
                    onChange={(e) => cta.setData('hero_cta_url', e.target.value)}
                    placeholder="/contact"
                  />
                  <InputError message={cta.errors.hero_cta_url} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="hero_cta_secondary_text">Teks Tombol Kedua</Label>
                  <Input
                    id="hero_cta_secondary_text"
                    value={cta.data.hero_cta_secondary_text}
                    onChange={(e) => cta.setData('hero_cta_secondary_text', e.target.value)}
                    placeholder="Lihat Layanan"
                  />
                  <InputError message={cta.errors.hero_cta_secondary_text} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="hero_cta_secondary_url">URL Tombol Kedua</Label>
                  <Input
                    id="hero_cta_secondary_url"
                    value={cta.data.hero_cta_secondary_url}
                    onChange={(e) => cta.setData('hero_cta_secondary_url', e.target.value)}
                    placeholder="/services"
                  />
                  <InputError message={cta.errors.hero_cta_secondary_url} />
                </div>

                <Button type="submit" disabled={cta.processing}>
                  {cta.processing ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
