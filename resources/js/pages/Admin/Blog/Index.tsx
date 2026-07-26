import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Post {
  id: number;
  title: string;
  slug: string;
  author: string;
  status: string;
  published_at?: string;
  category?: { id: number; name: string } | null;
  created_at: string;
}

interface PaginatedPosts {
  data: Post[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Props {
  posts: PaginatedPosts;
  filters?: { status?: string };
}

export default function BlogIndex({ posts }: Props) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleDelete() {
    if (!deleteId) return;
    router.delete(`/dashboard-admin/blog/${deleteId}`, {
      onFinish: () => setDeleteId(null),
    });
  }

  return (
    <>
      <Head title="Kelola Blog" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Blog</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola artikel blog</p>
        </div>
        <Link href="/dashboard-admin/blog/create">
          <Button>Tambah Post</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daftar Post ({posts.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada post. Buat post pertama!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.data.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium text-[#1F2937]">{post.title}</TableCell>
                    <TableCell className="text-[#6B7280]">{post.author}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === 'published' ? 'default' :
                          post.status === 'draft' ? 'secondary' :
                          'outline'
                        }
                      >
                        {post.status === 'published' ? 'Dipublikasi' :
                         post.status === 'draft' ? 'Draft' : post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#6B7280]">
                      {new Date(post.created_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard-admin/blog/${post.id}/edit`}
                          className="text-sm font-medium text-[#1E3A8A] hover:underline"
                        >
                          Edit
                        </Link>
                        <span className="text-[#D1D5DB]">|</span>
                        <button
                          onClick={() => setDeleteId(post.id)}
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

          {/* Pagination */}
          {posts.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {posts.current_page} dari {posts.last_page}
              </p>
              <div className="flex items-center gap-2">
                {posts.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/blog?page=${posts.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {posts.current_page < posts.last_page && (
                  <Link
                    href={`/dashboard-admin/blog?page=${posts.current_page + 1}`}
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
        title="Hapus Post"
        description="Post akan dihapus permanen. Apakah Anda yakin ingin melanjutkan?"
      />
    </>
  );
}
