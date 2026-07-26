import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
}

interface Props {
  settings: Settings;
}

export default function SettingsIndex({ settings }: Props) {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const { data, setData, put, errors, processing } = useForm({
    company_name: settings.company_name || '',
    company_tagline: settings.company_tagline || '',
    company_description: settings.company_description || '',
    contact_email: settings.contact_email || '',
    contact_phone: settings.contact_phone || '',
    contact_address: settings.contact_address || '',
    social_facebook: settings.social_facebook || '',
    social_instagram: settings.social_instagram || '',
    social_linkedin: settings.social_linkedin || '',
    social_twitter: settings.social_twitter || '',
    meta_title: settings.meta_title || '',
    meta_description: settings.meta_description || '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put('/dashboard-admin/settings');
  }

  return (
    <>
      <Head title="Pengaturan" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Pengaturan</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Kelola pengaturan global situs</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company_name">Nama Perusahaan</Label>
                <Input
                  id="company_name"
                  value={data.company_name}
                  onChange={(e) => setData('company_name', e.target.value)}
                />
                <InputError message={errors.company_name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company_tagline">Tagline</Label>
                <Input
                  id="company_tagline"
                  value={data.company_tagline}
                  onChange={(e) => setData('company_tagline', e.target.value)}
                />
                <InputError message={errors.company_tagline} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company_description">Deskripsi Perusahaan</Label>
                <textarea
                  id="company_description"
                  rows={4}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={data.company_description}
                  onChange={(e) => setData('company_description', e.target.value)}
                />
                <InputError message={errors.company_description} />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contact_email">Email Kontak</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={data.contact_email}
                  onChange={(e) => setData('contact_email', e.target.value)}
                />
                <InputError message={errors.contact_email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact_phone">Telepon</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={data.contact_phone}
                  onChange={(e) => setData('contact_phone', e.target.value)}
                />
                <InputError message={errors.contact_phone} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact_address">Alamat</Label>
                <textarea
                  id="contact_address"
                  rows={3}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={data.contact_address}
                  onChange={(e) => setData('contact_address', e.target.value)}
                />
                <InputError message={errors.contact_address} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Media Sosial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  value={data.social_facebook}
                  onChange={(e) => setData('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                />
                <InputError message={errors.social_facebook} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  value={data.social_instagram}
                  onChange={(e) => setData('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
                <InputError message={errors.social_instagram} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="social_linkedin">LinkedIn</Label>
                <Input
                  id="social_linkedin"
                  type="url"
                  value={data.social_linkedin}
                  onChange={(e) => setData('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                />
                <InputError message={errors.social_linkedin} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="social_twitter">Twitter / X</Label>
                <Input
                  id="social_twitter"
                  type="url"
                  value={data.social_twitter}
                  onChange={(e) => setData('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
                <InputError message={errors.social_twitter} />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO Global</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="meta_title">Meta Title Default</Label>
                <Input
                  id="meta_title"
                  value={data.meta_title}
                  onChange={(e) => setData('meta_title', e.target.value)}
                />
                <InputError message={errors.meta_title} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="meta_description">Meta Description Default</Label>
                <textarea
                  id="meta_description"
                  rows={3}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={data.meta_description}
                  onChange={(e) => setData('meta_description', e.target.value)}
                />
                <InputError message={errors.meta_description} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </Button>
        </div>
      </form>
    </>
  );
}
