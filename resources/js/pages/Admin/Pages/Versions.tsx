import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Version {
  id: number;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  change_notes: string | null;
  admin: { id: number; name: string } | null;
  created_at: string;
}

interface PaginatedVersions {
  data: Version[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Page {
  id: number;
  title: string;
  slug: string;
}

interface Props {
  page: Page;
  versions: PaginatedVersions;
}

export default function PageVersions({ page, versions }: Props) {
  const [rollbackId, setRollbackId] = useState<number | null>(null);

  function handleRollback() {
    if (!rollbackId) return;
    router.post(`/dashboard-admin/pages/${page.id}/versions/${rollbackId}/rollback`, {
      onFinish: () => setRollbackId(null),
    });
  }

  return (
    <>
      <Head title={`Riwayat Versi: ${page.title}`} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Riwayat Versi</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Halaman: {page.title}
          </p>
        </div>
        <Link href={`/dashboard-admin/pages/${page.slug}/edit`}>
          <Button variant="outline">Kembali ke Edit</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Versi ({versions.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {versions.data.length === 0 ? (
            <p className="text-sm text-[#6B7280]">Belum ada riwayat versi.</p>
          ) : (
            <div className="space-y-4">
              {versions.data.map((version) => (
                <div key={version.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{version.id}</Badge>
                      <span className="text-sm text-[#6B7280]">
                        {new Date(version.created_at).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard-admin/pages/${page.id}/versions/${version.id}`}
                        className="text-sm font-medium text-[#1E3A8A] hover:underline"
                      >
                        Lihat
                      </Link>
                      <span className="text-[#D1D5DB]">|</span>
                      <button
                        onClick={() => setRollbackId(version.id)}
                        className="text-sm font-medium text-amber-600 hover:underline"
                      >
                        Rollback
                      </button>
                    </div>
                  </div>
                  {version.change_notes && (
                    <p className="mb-1 text-sm italic text-[#6B7280]">
                      "{version.change_notes}"
                    </p>
                  )}
                  {version.admin && (
                    <p className="text-xs text-[#9CA3AF]">
                      Oleh: {version.admin.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {versions.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-[#6B7280]">
                Halaman {versions.current_page} dari {versions.last_page}
              </p>
              <div className="flex items-center gap-2">
                {versions.current_page > 1 && (
                  <Link
                    href={`/dashboard-admin/pages/${page.id}/versions?page=${versions.current_page - 1}`}
                    className="rounded-md border px-3 py-1 text-sm text-[#6B7280] hover:bg-gray-50"
                  >
                    Sebelumnya
                  </Link>
                )}
                {versions.current_page < versions.last_page && (
                  <Link
                    href={`/dashboard-admin/pages/${page.id}/versions?page=${versions.current_page + 1}`}
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
        open={rollbackId !== null}
        onOpenChange={(open) => { if (!open) setRollbackId(null); }}
        onConfirm={handleRollback}
        title="Rollback Versi"
        description="Perubahan saat ini akan disimpan sebagai versi baru sebelum rollback. Apakah Anda yakin ingin melanjutkan?"
        confirmText="Rollback"
      />
    </>
  );
}
