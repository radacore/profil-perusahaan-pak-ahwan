import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  email?: string;
  is_published: boolean;
}

interface Props {
  members: TeamMember[];
}

export default function TeamIndex({ members }: Props) {

  function handleDelete(id: number) {
    if (window.confirm('Yakin ingin menghapus anggota tim ini?')) {
      router.delete(`/dashboard-admin/team/${id}`);
    }
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
          <CardTitle className="text-lg">Daftar Anggota Tim</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
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
                {members.map((member) => (
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
                        <Link
                          href={`/dashboard-admin/team/${member.id}/edit`}
                          className="text-sm font-medium text-[#1E3A8A] hover:underline"
                        >
                          Edit
                        </Link>
                        <span className="text-[#D1D5DB]">|</span>
                        <button
                          onClick={() => handleDelete(member.id)}
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
