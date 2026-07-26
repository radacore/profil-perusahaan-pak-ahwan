import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
}

interface PaginatedSubmissions {
  data: Submission[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  submissions: PaginatedSubmissions;
  filters?: { status?: string };
}

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'read':
      return 'default' as const;
    case 'new':
      return 'secondary' as const;
    case 'archived':
      return 'outline' as const;
    default:
      return 'secondary' as const;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'read':
      return 'Terbaca';
    case 'new':
      return 'Baru';
    case 'archived':
      return 'Diarsipkan';
    default:
      return status;
  }
}

export default function ContactSubmissionsIndex({ submissions }: Props) {

  return (
    <>
      <Head title="Pesan Masuk" />
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Pesan Masuk</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Lihat pesan dari pengunjung situs</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Semua Pesan ({submissions.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada pesan masuk.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subjek</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.data.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium text-[#1F2937]">{sub.name}</TableCell>
                    <TableCell className="text-[#6B7280]">{sub.email}</TableCell>
                    <TableCell className="max-w-xs truncate text-[#6B7280]">
                      {sub.subject || '(tanpa subjek)'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(sub.status)}>
                        {getStatusLabel(sub.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6B7280]">
                      {new Date(sub.created_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard-admin/contact-submissions/${sub.id}`}
                        className="text-sm font-medium text-[#1E3A8A] hover:underline"
                      >
                        Detail
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {submissions.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {submissions.current_page} dari {submissions.last_page}
              </p>
              <div className="flex items-center gap-2">
                {submissions.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/contact-submissions?page=${submissions.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {submissions.current_page < submissions.last_page && (
                  <Link
                    href={`/dashboard-admin/contact-submissions?page=${submissions.current_page + 1}`}
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
    </>
  );
}
