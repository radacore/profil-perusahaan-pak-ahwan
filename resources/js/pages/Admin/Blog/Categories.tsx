import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Category {
  id: number;
  name: string;
  slug: string;
  blog_posts_count: number;
}

interface Props {
  categories: Category[];
}

export default function BlogCategories({ categories }: Props) {
  const [name, setName] = useState('');

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    router.post('/dashboard-admin/blog-categories', { name }, {
      onSuccess: () => setName(''),
    });
  }

  function handleDelete(id: number) {
    if (window.confirm('Yakin ingin menghapus kategori ini?')) {
      router.delete(`/dashboard-admin/blog-categories/${id}`);
    }
  }

  return (
    <>
      <Head title="Kategori Blog" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Kategori Blog</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Kelola kategori untuk artikel blog</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Tambah Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Kategori</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Teknologi"
                  required
                />
              </div>
              <Button type="submit">Simpan</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Daftar Kategori ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Belum ada kategori.</p>
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
                  {categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium text-[#1F2937]">{cat.name}</TableCell>
                      <TableCell className="text-[#6B7280]">{cat.slug}</TableCell>
                      <TableCell className="text-[#6B7280]">{cat.blog_posts_count}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDelete(cat.id)}
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
