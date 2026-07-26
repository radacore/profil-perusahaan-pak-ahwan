import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TeamCreate() {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    linkedin_url: '',
    is_published: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/dashboard-admin/team');
  }

  return (
    <>
      <Head title="Tambah Anggota Tim" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Tambah Anggota Tim</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Tambahkan anggota tim baru</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Anggota</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Jabatan</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
              />
              <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={4}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={data.bio}
                onChange={(e) => setData('bio', e.target.value)}
              />
              <InputError message={errors.bio} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telepon</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
              <InputError message={errors.phone} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="linkedin_url">URL LinkedIn</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={data.linkedin_url}
                onChange={(e) => setData('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
              <InputError message={errors.linkedin_url} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                checked={data.is_published}
                onCheckedChange={(checked) => setData('is_published', checked === true)}
              />
              <Label htmlFor="is_published" className="cursor-pointer">Tampilkan di situs</Label>
            </div>
            <InputError message={errors.is_published} />
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
        </div>
      </form>
    </>
  );
}
