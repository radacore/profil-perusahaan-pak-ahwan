import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface MediaItem {
  id: number;
  s3_url: string;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  is_published: boolean;
  media?: MediaItem | null;
}

interface Props {
  member: TeamMember;
}

export default function TeamEdit({ member }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const { data, setData, put, errors, processing } = useForm({
    name: member.name,
    title: member.title,
    bio: member.bio || '',
    email: member.email || '',
    phone: member.phone || '',
    linkedin_url: member.linkedin_url || '',
    is_published: member.is_published,
    photo: null as File | null,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(`/dashboard-admin/team/${member.id}`);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setData('photo', file);
    setPreview(URL.createObjectURL(file));
  }

  const currentPhoto = member.media?.s3_url;

  return (
    <>
      <Head title={`Edit Anggota Tim: ${member.name}`} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Edit Anggota Tim</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Anggota</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="title">Jabatan</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                  />
                  <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                  />
                  <InputError message={errors.bio} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                  />
                  <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedin_url">URL LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={data.linkedin_url}
                    onChange={(e) => setData('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                  <InputError message={errors.linkedin_url} />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is_published"
                    checked={data.is_published}
                    onCheckedChange={(checked) => setData('is_published', checked === true)}
                  />
                  <Label htmlFor="is_published" className="cursor-pointer">Tampilkan di situs</Label>
                </div>
                <InputError message={errors.is_published} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Foto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-40 w-40 rounded-full object-cover border-4 border-[#E0F2FE]"
                    />
                  ) : currentPhoto ? (
                    <img
                      src={currentPhoto}
                      alt={member.name}
                      className="h-40 w-40 rounded-full object-cover border-4 border-[#E0F2FE]"
                    />
                  ) : (
                    <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F3F4F6] border-4 border-dashed border-[#D1D5DB]">
                      <svg className="h-8 w-8 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="photo">Ganti Foto</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handlePhotoChange}
                    className="cursor-pointer"
                  />
                  <InputError message={errors.photo} />
                  <p className="text-xs text-[#6B7280]">Format: JPG, PNG, GIF, WebP. Maks 5MB.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={processing}>
            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Batal
          </Button>
        </div>
      </form>
    </>
  );
}
