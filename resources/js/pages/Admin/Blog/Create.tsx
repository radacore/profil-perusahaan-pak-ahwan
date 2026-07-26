import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RichTextEditor from '@/components/rich-text-editor';

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Props {
  categories?: Category[];
  tags?: Tag[];
}

export default function BlogCreate({ categories = [] }: Props) {
  const { flash } = usePage().props as { flash?: { success?: string } };
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    content: '',
    author: '',
    category_id: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/dashboard-admin/blog');
  }

  return (
    <>
      <Head title="Tulis Post Baru" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Tulis Post Baru</h1>
        <p className="mt-1 text-sm text-[#6B7280]">Buat artikel blog baru</p>
      </div>

      {flash?.success && (
        <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Berhasil</AlertTitle>
          <AlertDescription>{flash.success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Konten Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                required
              />
              <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Konten</Label>
              <RichTextEditor
                value={data.content}
                onChange={(value) => setData('content', value)}
                height={500}
              />
              <InputError message={errors.content} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="author">Penulis</Label>
              <Input
                id="author"
                value={data.author}
                onChange={(e) => setData('author', e.target.value)}
                required
              />
              <InputError message={errors.author} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pengaturan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="category_id">Kategori</Label>
              <Select
                value={data.category_id}
                onValueChange={(val) => setData('category_id', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.category_id} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={data.status}
                onValueChange={(val) => setData('status', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Dipublikasi</SelectItem>
                  <SelectItem value="archived">Diarsipkan</SelectItem>
                </SelectContent>
              </Select>
              <InputError message={errors.status} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO / Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={data.meta_title}
                onChange={(e) => setData('meta_title', e.target.value)}
              />
              <InputError message={errors.meta_title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <textarea
                id="meta_description"
                rows={3}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={data.meta_description}
                onChange={(e) => setData('meta_description', e.target.value)}
              />
              <InputError message={errors.meta_description} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
        </div>
      </form>
    </>
  );
}
