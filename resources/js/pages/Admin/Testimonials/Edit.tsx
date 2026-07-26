import { Head, useForm } from '@inertiajs/react';
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
import InputError from '@/components/input-error';

interface Testimonial {
  id: number;
  client_name: string;
  client_company?: string;
  client_title?: string;
  message: string;
  rating: number;
  status: string;
}

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialsEdit({ testimonial }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    client_name: testimonial.client_name,
    client_company: testimonial.client_company || '',
    client_title: testimonial.client_title || '',
    message: testimonial.message,
    rating: String(testimonial.rating),
    status: testimonial.status,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(`/dashboard-admin/testimonials/${testimonial.id}`);
  }

  return (
    <>
      <Head title="Edit Testimoni" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Edit Testimoni</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Edit testimoni dari {testimonial.client_name}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Klien</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="client_name">Nama Klien</Label>
              <Input
                id="client_name"
                value={data.client_name}
                onChange={(e) => setData('client_name', e.target.value)}
                required
              />
              <InputError message={errors.client_name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client_company">Perusahaan</Label>
              <Input
                id="client_company"
                value={data.client_company}
                onChange={(e) => setData('client_company', e.target.value)}
              />
              <InputError message={errors.client_company} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client_title">Jabatan</Label>
              <Input
                id="client_title"
                value={data.client_title}
                onChange={(e) => setData('client_title', e.target.value)}
              />
              <InputError message={errors.client_title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Testimoni</Label>
              <textarea
                id="message"
                rows={5}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
                required
              />
              <InputError message={errors.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Select
                value={data.rating}
                onValueChange={(val) => setData('rating', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">★★★★★ (5)</SelectItem>
                  <SelectItem value="4">★★★★☆ (4)</SelectItem>
                  <SelectItem value="3">★★★☆☆ (3)</SelectItem>
                  <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
                  <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.rating} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={data.status}
                onValueChange={(val) => setData('status', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} />
            </div>
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
