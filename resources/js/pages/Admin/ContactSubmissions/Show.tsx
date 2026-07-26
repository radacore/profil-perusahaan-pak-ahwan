import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  submission: Submission;
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

export default function ContactSubmissionsShow({ submission }: Props) {
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  function archive() {
    router.put(`/dashboard-admin/contact-submissions/${submission.id}/archive`);
  }

  return (
    <>
      <Head title={`Pesan dari ${submission.name}`} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Detail Pesan</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            <Link href="/dashboard-admin/contact-submissions" className="hover:underline">
              Pesan Masuk
            </Link>
            {' / '}Detail
          </p>
        </div>
        <div className="flex items-center gap-2">
          {submission.status !== 'archived' && (
            <Button variant="outline" onClick={() => setShowArchiveConfirm(true)} size="sm">
              Arsipkan
            </Button>
          )}
          <Link href="/dashboard-admin/contact-submissions">
            <Button variant="ghost" size="sm">Kembali</Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pesan</CardTitle>
                <Badge variant={getStatusBadgeVariant(submission.status)}>
                  {getStatusLabel(submission.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm font-medium text-[#6B7280]">
                {submission.subject || '(tanpa subjek)'}
              </p>
              <Separator className="my-4" />
              <div className="whitespace-pre-wrap text-sm text-[#1F2937]">
                {submission.message}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pengirim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase text-[#6B7280]">Nama</p>
                <p className="font-medium text-[#1F2937]">{submission.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs uppercase text-[#6B7280]">Email</p>
                <a
                  href={`mailto:${submission.email}`}
                  className="font-medium text-[#1E3A8A] hover:underline"
                >
                  {submission.email}
                </a>
              </div>
              {submission.phone && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs uppercase text-[#6B7280]">Telepon</p>
                    <a
                      href={`tel:${submission.phone}`}
                      className="font-medium text-[#1E3A8A] hover:underline"
                    >
                      {submission.phone}
                    </a>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <p className="text-xs uppercase text-[#6B7280]">Dikirim Pada</p>
                <p className="font-medium text-[#1F2937]">
                  {new Date(submission.created_at).toLocaleString('id-ID', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ConfirmDialog
        open={showArchiveConfirm}
        onOpenChange={setShowArchiveConfirm}
        onConfirm={archive}
        title="Arsipkan Pesan"
        description="Pesan akan dipindahkan ke arsip dan tidak akan muncul di daftar pesan masuk utama."
        confirmText="Arsipkan"
      />
    </>
  );
}
