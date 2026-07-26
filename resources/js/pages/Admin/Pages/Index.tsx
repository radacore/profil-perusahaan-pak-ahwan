import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Page {
  id: number;
  title: string;
  slug: string;
  is_published: boolean;
  updated_at: string;
}

interface Props {
  pages: Page[];
}

export default function PagesIndex({ pages }: Props) {
  return (
    <>
      <Head title="Kelola Halaman" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Halaman</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola halaman statis situs</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Halaman</CardTitle>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada halaman.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Terakhir Diperbarui</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium text-[#1F2937]">{page.title}</TableCell>
                    <TableCell className="text-[#6B7280]">/{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={page.is_published ? 'default' : 'secondary'}>
                        {page.is_published ? 'Dipublikasi' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6B7280]">
                      {new Date(page.updated_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard-admin/pages/${page.slug}/edit`}
                        className="text-sm font-medium text-[#1E3A8A] hover:underline"
                      >
                        Edit
                      </Link>
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
