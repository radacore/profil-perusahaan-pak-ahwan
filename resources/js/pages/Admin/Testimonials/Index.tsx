import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Testimonial {
  id: number;
  client_name: string;
  client_company?: string;
  client_title?: string;
  message: string;
  rating: number;
  status: string;
  display_order?: number;
  created_at: string;
}

interface PaginatedTestimonials {
  data: Testimonial[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  testimonials: PaginatedTestimonials;
  filters?: { status?: string };
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'approved':
      return 'default' as const;
    case 'pending':
      return 'secondary' as const;
    case 'rejected':
      return 'destructive' as const;
    default:
      return 'outline' as const;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'approved':
      return 'Disetujui';
    case 'pending':
      return 'Menunggu';
    case 'rejected':
      return 'Ditolak';
    default:
      return status;
  }
}

export default function TestimonialsIndex({ testimonials }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleDelete() {
    if (!deleteId) return;
    router.delete(`/dashboard-admin/testimonials/${deleteId}`, {
      onFinish: () => setDeleteId(null),
    });
  }

  return (
    <>
      <Head title="Kelola Testimoni" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Testimoni</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola testimoni klien</p>
        </div>
        <Link href="/dashboard-admin/testimonials/create">
          <Button>Tambah Testimoni</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Testimoni ({testimonials.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {testimonials.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada testimoni.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Klien</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.data.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium text-[#1F2937]">{testimonial.client_name}</TableCell>
                    <TableCell className="text-[#6B7280]">{testimonial.client_company || '-'}</TableCell>
                    <TableCell className="text-[#6B7280]">
                      {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(testimonial.status)}>
                        {getStatusLabel(testimonial.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6B7280]">
                      {new Date(testimonial.created_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard-admin/testimonials/${testimonial.id}/edit`}>
                          <Button size="sm" className="bg-black text-white hover:bg-green-600 hover:text-white">Edit</Button>
                        </Link>
                        <Button size="sm" onClick={() => setDeleteId(testimonial.id)} className="bg-black text-white hover:bg-red-600 hover:text-white">Hapus</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {testimonials.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {testimonials.current_page} dari {testimonials.last_page}
              </p>
              <div className="flex items-center gap-2">
                {testimonials.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/testimonials?page=${testimonials.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {testimonials.current_page < testimonials.last_page && (
                  <Link
                    href={`/dashboard-admin/testimonials?page=${testimonials.current_page + 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Selanjutnya
                  </Link>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => { if (!open) setDeleteId(null); }}
        onConfirm={handleDelete}
        title="Hapus Testimoni"
        description="Testimoni akan dihapus permanen. Apakah Anda yakin ingin melanjutkan?"
      />
    </>
  );
}
