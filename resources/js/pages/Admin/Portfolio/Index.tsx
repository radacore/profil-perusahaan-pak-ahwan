import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Project {
  id: number;
  title: string;
  slug: string;
  client_name?: string;
  project_date?: string;
  is_published: boolean;
  service?: { id: number; title: string } | null;
  created_at: string;
}

interface PaginatedProjects {
  data: Project[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  projects: PaginatedProjects;
}

export default function PortfolioIndex({ projects }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleDelete() {
    if (!deleteId) return;
    router.delete(`/dashboard-admin/portfolio/${deleteId}`, {
      onFinish: () => setDeleteId(null),
    });
  }

  return (
    <>
      <Head title="Kelola Portofolio" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Portofolio</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola proyek portofolio</p>
        </div>
        <Link href="/dashboard-admin/portfolio/create">
          <Button>Tambah Proyek</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Proyek ({projects.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada proyek portofolio.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Klien</TableHead>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Tanggal Proyek</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.data.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium text-[#1F2937]">{project.title}</TableCell>
                    <TableCell className="text-[#6B7280]">{project.client_name || '-'}</TableCell>
                    <TableCell className="text-[#6B7280]">
                      {project.service?.title || '-'}
                    </TableCell>
                    <TableCell className="text-[#6B7280]">
                      {project.project_date
                        ? new Date(project.project_date).toLocaleDateString('id-ID')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.is_published ? 'default' : 'secondary'}>
                        {project.is_published ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard-admin/portfolio/${project.id}/edit`}
                          className="text-sm font-medium text-[#1E3A8A] hover:underline"
                        >
                          Edit
                        </Link>
                        <span className="text-[#D1D5DB]">|</span>
                        <button
                          onClick={() => setDeleteId(project.id)}
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

          {projects.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {projects.current_page} dari {projects.last_page}
              </p>
              <div className="flex items-center gap-2">
                {projects.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/portfolio?page=${projects.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {projects.current_page < projects.last_page && (
                  <Link
                    href={`/dashboard-admin/portfolio?page=${projects.current_page + 1}`}
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
        title="Hapus Proyek"
        description="Semua data proyek termasuk gambar akan dihapus. Apakah Anda yakin ingin melanjutkan?"
      />
    </>
  );
}
