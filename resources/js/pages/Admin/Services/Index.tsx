import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Service {
  id: number;
  title: string;
  short_description?: string;
  is_published: boolean;
}

interface PaginatedServices {
  data: Service[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  services: PaginatedServices;
}

export default function ServicesIndex({ services }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleDelete() {
    if (!deleteId) return;
    router.delete(`/dashboard-admin/services/${deleteId}`, {
      onFinish: () => setDeleteId(null),
    });
  }

  return (
    <>
      <Head title="Kelola Layanan" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Layanan</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola layanan yang ditampilkan di situs</p>
        </div>
        <Link href="/dashboard-admin/services/create">
          <Button>Tambah Layanan</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Layanan ({services.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {services.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada layanan.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Deskripsi Singkat</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-[#1F2937]">{service.title}</TableCell>
                    <TableCell className="max-w-xs truncate text-[#6B7280]">
                      {service.short_description || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.is_published ? 'default' : 'secondary'}>
                        {service.is_published ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard-admin/services/${service.id}/edit`}>
                          <Button size="sm" className="bg-black text-white hover:bg-green-600 hover:text-white">Edit</Button>
                        </Link>
                        <Button size="sm" onClick={() => setDeleteId(service.id)} className="bg-black text-white hover:bg-red-600 hover:text-white">Hapus</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {services.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {services.current_page} dari {services.last_page}
              </p>
              <div className="flex items-center gap-2">
                {services.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/services?page=${services.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {services.current_page < services.last_page && (
                  <Link
                    href={`/dashboard-admin/services?page=${services.current_page + 1}`}
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
        title="Hapus Layanan"
        description="Layanan yang dihapus tidak bisa dikembalikan. Apakah Anda yakin ingin melanjutkan?"
      />
    </>
  );
}
