import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ServicesCreate() {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    display_order: 0,
    is_published: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/dashboard-admin/services');
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  return (
    <>
      <Head title="Tambah Layanan" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Tambah Layanan</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Buat layanan baru</p>
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
            <CardTitle className="text-lg">Informasi Layanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => {
                  setData('title', e.target.value);
                  if (!data.slug) {
                    setData('slug', generateSlug(e.target.value));
                  }
                }}
                required
              />
              <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)}
                required
              />
              <p className="text-xs text-[#6B7280]">Biarkan kosong untuk generate otomatis.</p>
              <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="short_description">Deskripsi Singkat</Label>
              <textarea
                id="short_description"
                rows={3}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={data.short_description}
                onChange={(e) => setData('short_description', e.target.value)}
              />
              <InputError message={errors.short_description} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi Lengkap</Label>
              <textarea
                id="description"
                rows={8}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
              <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="display_order">Urutan Tampil</Label>
              <Input
                id="display_order"
                type="number"
                value={data.display_order}
                onChange={(e) => setData('display_order', Number(e.target.value))}
              />
              <InputError message={errors.display_order} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                checked={data.is_published}
                onCheckedChange={(checked) => setData('is_published', checked === true)}
              />
              <Label htmlFor="is_published" className="cursor-pointer">Publikasikan layanan ini</Label>
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
