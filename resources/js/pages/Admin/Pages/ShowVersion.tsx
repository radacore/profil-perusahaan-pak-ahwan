import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Version {
  id: number;
  content: string;
  mission: string | null;
  vision: string | null;
  values: string | null;
  meta_title: string | null;
  meta_description: string | null;
  change_notes: string | null;
  admin: { id: number; name: string } | null;
  created_at: string;
  page_id: number;
}

interface Props {
  version: Version;
}

export default function ShowPageVersion({ version }: Props) {
  const [showRollbackConfirm, setShowRollbackConfirm] = useState(false);

  function handleRollback() {
    router.post(`/dashboard-admin/pages/${version.page_id}/versions/${version.id}/rollback`);
  }

  return (
    <>
      <Head title={`Versi #${version.id}`} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Versi <Badge variant="outline">#{version.id}</Badge>
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {new Date(version.created_at).toLocaleString('id-ID')}
            {version.admin && ` — oleh ${version.admin.name}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard-admin/pages/${version.page_id}/versions`}
          >
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button onClick={() => setShowRollbackConfirm(true)} className="bg-amber-600 hover:bg-amber-700">
            Rollback ke Versi Ini
          </Button>
        </div>
      </div>

      {version.change_notes && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          <strong>Catatan:</strong> "{version.change_notes}"
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Konten</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: version.content }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Misi & Visi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {version.mission && (
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase text-[#6B7280]">Misi</h4>
                  <p className="text-sm whitespace-pre-wrap">{version.mission}</p>
                </div>
              )}
              {version.vision && (
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase text-[#6B7280]">Visi</h4>
                  <p className="text-sm whitespace-pre-wrap">{version.vision}</p>
                </div>
              )}
              {version.values && (() => {
                const parsed = JSON.parse(version.values);
                return Array.isArray(parsed) && parsed.length > 0 ? (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase text-[#6B7280]">Nilai-Nilai</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {parsed.map((v: string, i: number) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })()}
              {!version.mission && !version.vision && !version.values && (
                <p className="text-sm text-[#6B7280]">Tidak ada data.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {version.meta_title && (
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase text-[#6B7280]">Meta Title</h4>
                  <p className="text-sm">{version.meta_title}</p>
                </div>
              )}
              {version.meta_description && (
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase text-[#6B7280]">Meta Description</h4>
                  <p className="text-sm">{version.meta_description}</p>
                </div>
              )}
              {!version.meta_title && !version.meta_description && (
                <p className="text-sm text-[#6B7280]">Tidak ada data meta.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ConfirmDialog
        open={showRollbackConfirm}
        onOpenChange={setShowRollbackConfirm}
        onConfirm={handleRollback}
        title="Rollback Versi"
        description="Yakin ingin mengembalikan ke versi ini? Perubahan saat ini akan disimpan sebagai versi baru."
        confirmText="Rollback"
      />
    </>
  );
}
