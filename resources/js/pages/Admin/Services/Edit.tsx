import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import RichTextEditor from '@/components/rich-text-editor';
import IconPicker from '@/components/admin/icon-picker';

interface Service {
  id: number;
  title: string;
  description: string;
  short_description: string;
  icon_name: string | null;
  is_published: boolean;
}

interface Props {
  service: Service;
}

export default function ServicesEdit({ service }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    title: service.title,
    description: service.description,
    short_description: service.short_description,
    icon_name: service.icon_name || '',
    is_published: service.is_published,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(`/dashboard-admin/services/${service.id}`);
  }

  return (
    <>
      <Head title={`Edit Layanan: ${service.title}`} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Edit Layanan</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Edit: {service.title}</p>
      </div>
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
                onChange={(e) => setData('title', e.target.value)}
                required
              />
              <InputError message={errors.title} />
            </div>

            <IconPicker value={data.icon_name} onChange={(v) => setData('icon_name', v)} />
            <InputError message={errors.icon_name} />

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
              <RichTextEditor
                value={data.description}
                onChange={(value) => setData('description', value)}
                height={400}
              />
              <InputError message={errors.description} />
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
            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
        </div>
      </form>
    </>
  );
}
