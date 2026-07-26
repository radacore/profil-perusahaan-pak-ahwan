import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Tag {
  id: number;
  name: string;
  slug: string;
  blog_posts_count: number;
}

interface Props {
  tags: Tag[];
}

export default function BlogTags({ tags }: Props) {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const [name, setName] = useState('');

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    router.post('/dashboard-admin/blog-tags', { name }, {
      onSuccess: () => setName(''),
    });
  }

  function handleDelete(id: number) {
    if (window.confirm('Yakin ingin menghapus tag ini?')) {
      router.delete(`/dashboard-admin/blog-tags/${id}`);
    }
  }

  return (
    <>
      <Head title="Tag Blog" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Tag Blog</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Kelola tag untuk artikel blog</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Tambah Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Tag</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Laravel"
                  required
                />
              </div>
              <Button type="submit">Simpan</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Daftar Tag ({tags.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {tags.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Belum ada tag.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Jumlah Post</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell className="font-medium text-[#1F2937]">{tag.name}</TableCell>
                      <TableCell className="text-[#6B7280]">{tag.slug}</TableCell>
                      <TableCell className="text-[#6B7280]">{tag.blog_posts_count}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
