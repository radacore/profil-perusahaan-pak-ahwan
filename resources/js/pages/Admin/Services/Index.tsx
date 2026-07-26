import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Service {
  id: number;
  title: string;
  short_description?: string;
  is_published: boolean;
}

interface Props {
  services: Service[];
}

export default function ServicesIndex({ services }: Props) {

  function handleDelete(id: number) {
    if (window.confirm('Yakin ingin menghapus layanan ini?')) {
      router.delete(`/dashboard-admin/services/${id}`);
    }
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
          <CardTitle className="text-lg">Daftar Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
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
                {services.map((service) => (
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
                        <Link
                          href={`/dashboard-admin/services/${service.id}/edit`}
                          className="text-sm font-medium text-[#1E3A8A] hover:underline"
                        >
                          Edit
                        </Link>
                        <span className="text-[#D1D5DB]">|</span>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
