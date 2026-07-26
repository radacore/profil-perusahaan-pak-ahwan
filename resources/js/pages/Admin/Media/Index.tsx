import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  created_at: string;
}

interface Props {
  media: MediaItem[];
  filters?: { media_type?: string };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function MediaIndex({ media }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const { data, setData, post, errors, processing } = useForm({
    file: null as File | null,
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setData('file', e.target.files[0]);
    }
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!data.file) return;

    setIsUploading(true);
    post('/dashboard-admin/media', {
      onFinish: () => {
        setIsUploading(false);
        setData('file', null);
      },
    });
  }

  return (
    <>
      <Head title="Media" />
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Media</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Kelola file media</p>
        </div>
      </div>
      {/* Upload Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="flex items-end gap-4">
            <div className="flex-1">
              <input
                type="file"
                onChange={handleFileChange}
                className="border-input file:text-foreground placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium"
                accept="image/*,.pdf,.doc,.docx"
              />
              {errors.file && (
                <p className="mt-1 text-sm text-red-600">{errors.file}</p>
              )}
            </div>
            <Button type="submit" disabled={processing || !data.file}>
              {processing ? 'Mengupload...' : 'Upload'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {media.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-sm text-[#6B7280]">
              Belum ada media. Upload file untuk memulai.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square bg-[#F3F4F6]">
                {item.mime_type?.startsWith('image/') ? (
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.original_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#6B7280]">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <p className="truncate text-xs font-medium text-[#1F2937]">
                  {item.original_name}
                </p>
                <p className="text-xs text-[#6B7280]">{formatFileSize(item.size)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
