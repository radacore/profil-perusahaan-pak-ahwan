import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import RichTextEditor from '@/components/rich-text-editor';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  mission?: string;
  vision?: string;
  values?: string[];
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
}

interface Props {
  page: Page;
}

export default function PagesEdit({ page }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    title: page.title,
    content: page.content,
    mission: page.mission || '',
    vision: page.vision || '',
    values: page.values || [],
    meta_title: page.meta_title || '',
    meta_description: page.meta_description || '',
    is_published: page.is_published,
  });

  function addValue() {
    setData('values', [...data.values, '']);
  }

  function removeValue(index: number) {
    setData('values', data.values.filter((_, i) => i !== index));
  }

  function updateValue(index: number, value: string) {
    const updated = [...data.values];
    updated[index] = value;
    setData('values', updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(`/dashboard-admin/pages/${page.id}`);
  }

  return (
    <>
      <Head title={`Edit Halaman: ${page.title}`} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Edit Halaman</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Edit: {page.title}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Konten Halaman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul Halaman</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                  />
                  <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content">Konten</Label>
                  <RichTextEditor
                    value={data.content}
                    onChange={(value) => setData('content', value)}
                    height={500}
                  />
                  <InputError message={errors.content} />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is_published"
                    checked={data.is_published}
                    onCheckedChange={(checked) => setData('is_published', checked === true)}
                  />
                  <Label htmlFor="is_published" className="cursor-pointer">Publikasikan halaman ini</Label>
                </div>
                <InputError message={errors.is_published} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Misi & Visi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="mission">Misi</Label>
                  <textarea
                    id="mission"
                    rows={4}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={data.mission}
                    onChange={(e) => setData('mission', e.target.value)}
                  />
                  <InputError message={errors.mission} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="vision">Visi</Label>
                  <textarea
                    id="vision"
                    rows={4}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={data.vision}
                    onChange={(e) => setData('vision', e.target.value)}
                  />
                  <InputError message={errors.vision} />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Nilai-Nilai</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addValue}>
                      + Tambah Nilai
                    </Button>
                  </div>
                  {data.values.map((value, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Input
                        value={value}
                        onChange={(e) => updateValue(index, e.target.value)}
                        placeholder={`Nilai #${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeValue(index)}
                        className="shrink-0 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </Button>
                    </div>
                  ))}
                  <InputError message={errors.values} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO / Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={data.meta_title}
                    onChange={(e) => setData('meta_title', e.target.value)}
                  />
                  <InputError message={errors.meta_title} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
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
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button type="submit" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
          <Link
            href={`/dashboard-admin/pages/${page.id}/versions`}
            className="ml-auto text-sm font-medium text-[#6B7280] hover:text-[#1E3A8A]"
          >
            Lihat Riwayat Versi →
          </Link>
        </div>
      </form>
    </>
  );
}
