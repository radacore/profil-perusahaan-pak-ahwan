import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
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

interface Props {
  services?: Service[];
}

export default function PortfolioCreate({ services = [] }: Props) {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const [previews, setPreviews] = useState<string[]>([]);

  const { data, setData, post, errors, processing } = useForm({
    title: '',
    description: '',
    client_name: '',
    project_date: '',
    service_id: '',
    is_published: true,
    images: [] as File[],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/dashboard-admin/portfolio');
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files || []);
    setData('images', [...data.images, ...newFiles]);

    const newUrls = newFiles.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newUrls]);

    e.target.value = '';
  }

  function removeImage(index: number) {
    const updated = data.images.filter((_, i) => i !== index);
    setData('images', updated);
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }

  return (
    <>
      <Head title="Tambah Proyek Portofolio" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Tambah Proyek Portofolio</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Buat proyek portofolio baru</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
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
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gambar Proyek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Upload Gambar</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-[#6B7280]">
                    Gambar pertama akan menjadi thumbnail. Format: JPEG, PNG, GIF, WebP. Maks 5MB per gambar.
                  </p>
                  <InputError message={errors['images.0']} />
                </div>

                {previews.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {previews.map((url, index) => (
                      <div key={url} className="group relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-28 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          ✕
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
                            Thumbnail
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

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
