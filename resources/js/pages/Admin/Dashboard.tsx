import { Head, Link } from '@inertiajs/react';
import { FileText, Briefcase, Settings, Users, Star, Image, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Stats {
  total_posts: number;
  total_projects: number;
  total_services: number;
  total_team: number;
  total_testimonials: number;
  total_media: number;
  total_submissions: number;
}

interface QuickStats {
  draft_posts: number;
  pending_testimonials: number;
  new_submissions: number;
}

interface Post {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  client_name?: string;
  is_published: boolean;
  project_date?: string;
  created_at: string;
  service?: { id: number; title: string } | null;
}

interface Submission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
}

interface Props {
  stats: Stats;
  quick_stats: QuickStats;
  recent_posts: Post[];
  recent_projects: Project[];
  recent_submissions: Submission[];
}

export default function AdminDashboard({ stats, quick_stats, recent_posts, recent_projects, recent_submissions }: Props) {
  const statCards = [
    { label: 'Total Post', value: stats.total_posts, icon: FileText },
    { label: 'Total Proyek', value: stats.total_projects, icon: Briefcase },
    { label: 'Total Layanan', value: stats.total_services, icon: Settings },
    { label: 'Total Anggota Tim', value: stats.total_team, icon: Users },
    { label: 'Total Testimoni', value: stats.total_testimonials, icon: Star },
    { label: 'Total Media', value: stats.total_media, icon: Image },
    { label: 'Total Pesan', value: stats.total_submissions, icon: Mail },
  ];

  const needsAttention =
    quick_stats.draft_posts > 0 ||
    quick_stats.pending_testimonials > 0 ||
    quick_stats.new_submissions > 0;

  return (
    <>
      <Head title="Dashboard" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan data situs ProfilKorp</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="relative z-10">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="absolute bottom-1 right-1 h-16 w-16 text-foreground/[0.06]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {needsAttention && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <span className="text-sm font-medium text-amber-800">Perlu Perhatian:</span>

            {quick_stats.draft_posts > 0 && (
              <Link
                href="/dashboard-admin/blog"
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-amber-700 shadow-xs hover:bg-amber-100"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
                  {quick_stats.draft_posts}
                </span>
                Post Draft
              </Link>
            )}

            {quick_stats.pending_testimonials > 0 && (
              <Link
                href="/dashboard-admin/testimonials"
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-orange-700 shadow-xs hover:bg-orange-100"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                  {quick_stats.pending_testimonials}
                </span>
                Testimoni Pending
              </Link>
            )}

            {quick_stats.new_submissions > 0 && (
              <Link
                href="/dashboard-admin/contact-submissions"
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-blue-700 shadow-xs hover:bg-blue-100"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {quick_stats.new_submissions}
                </span>
                Pesan Baru
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Post Terbaru</CardTitle>
              <Link href="/dashboard-admin/blog" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent>
              {recent_posts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada post.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recent_posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
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
                        <TableCell className="text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString('id-ID')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Proyek Terbaru</CardTitle>
              <Link href="/dashboard-admin/portfolio" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent>
              {recent_projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada proyek.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recent_projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>
                          <Badge variant={project.is_published ? 'default' : 'secondary'}>
                            {project.is_published ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pesan Masuk Terbaru</CardTitle>
          <Link href="/dashboard-admin/contact-submissions" className="text-sm text-primary hover:underline">
            Lihat Semua
          </Link>
        </CardHeader>
        <CardContent>
          {recent_submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada pesan masuk.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Pesan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent_submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell className="text-muted-foreground">{sub.email}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">{sub.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sub.status === 'new' ? 'secondary' :
                          sub.status === 'read' ? 'default' :
                          'outline'
                        }
                      >
                        {sub.status === 'new' ? 'Baru' :
                         sub.status === 'read' ? 'Terbaca' :
                         sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(sub.created_at).toLocaleDateString('id-ID')}
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
