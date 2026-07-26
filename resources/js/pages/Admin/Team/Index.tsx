import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  email?: string;
  is_published: boolean;
}

interface PaginatedMembers {
  data: TeamMember[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  members: PaginatedMembers;
}

export default function TeamIndex({ members }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleDelete() {
    if (!deleteId) return;
    router.delete(`/dashboard-admin/team/${deleteId}`, {
      onFinish: () => setDeleteId(null),
    });
  }

  return (
    <>
      <Head title="Kelola Tim" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Tim</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola anggota tim</p>
        </div>
        <Link href="/dashboard-admin/team/create">
          <Button>Tambah Anggota</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Anggota Tim ({members.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {members.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada anggota tim.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.data.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium text-[#1F2937]">{member.name}</TableCell>
                    <TableCell className="text-[#6B7280]">{member.title}</TableCell>
                    <TableCell className="text-[#6B7280]">{member.email || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={member.is_published ? 'default' : 'secondary'}>
                        {member.is_published ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard-admin/team/${member.id}/edit`}>
                          <Button size="sm" className="bg-black text-white hover:bg-green-600 hover:text-white">Edit</Button>
                        </Link>
                        <Button size="sm" onClick={() => setDeleteId(member.id)} className="bg-black text-white hover:bg-red-600 hover:text-white">Hapus</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {members.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {members.current_page} dari {members.last_page}
              </p>
              <div className="flex items-center gap-2">
                {members.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/team?page=${members.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {members.current_page < members.last_page && (
                  <Link
                    href={`/dashboard-admin/team?page=${members.current_page + 1}`}
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
        title="Hapus Anggota Tim"
        description="Data anggota tim akan dihapus permanen. Apakah Anda yakin ingin melanjutkan?"
      />
    </>
  );
}
