import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Service {
  id: number;
  title: string;
}

interface GalleryImage {
  id: number;
  alt_text?: string;
  display_order: number;
  media?: { s3_url: string };
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name?: string;
  project_date?: string;
  service_id: number | null;
  is_published: boolean;
  thumbnail_url?: string | null;
}

interface Props {
  project: Project;
  services?: Service[];
  gallery?: GalleryImage[];
}

export default function PortfolioEdit({ project, services = [] }: Props) {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const { data, setData, put, errors, processing } = useForm({
    title: project.title,
    slug: project.slug,
    description: project.description,
    client_name: project.client_name || '',
    project_date: project.project_date || '',
    service_id: project.service_id ? String(project.service_id) : '',
    is_published: project.is_published,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(`/dashboard-admin/portfolio/${project.id}`);
  }

  return (
    <>
      <Head title={`Edit Proyek: ${project.title}`} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Edit Proyek Portofolio</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Edit: {project.title}</p>
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
            <CardTitle className="text-lg">Informasi Proyek</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Proyek</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
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
              <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
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
              <Label htmlFor="client_name">Nama Klien</Label>
              <Input
                id="client_name"
                value={data.client_name}
                onChange={(e) => setData('client_name', e.target.value)}
              />
              <InputError message={errors.client_name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project_date">Tanggal Proyek</Label>
              <Input
                id="project_date"
                type="date"
                value={data.project_date}
                onChange={(e) => setData('project_date', e.target.value)}
              />
              <InputError message={errors.project_date} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service_id">Layanan</Label>
              <Select
                value={data.service_id}
                onValueChange={(val) => setData('service_id', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih layanan" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((svc) => (
                    <SelectItem key={svc.id} value={String(svc.id)}>
                      {svc.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.service_id} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_published"
                checked={data.is_published}
                onCheckedChange={(checked) => setData('is_published', checked === true)}
              />
              <Label htmlFor="is_published" className="cursor-pointer">Publikasikan proyek ini</Label>
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
