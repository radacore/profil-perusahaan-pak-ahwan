import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Stats {
  total_posts: number;
  published_posts: number;
  total_projects: number;
  total_submissions: number;
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
  recent_submissions: Submission[];
}

export default function AdminDashboard({ stats, recent_submissions }: Props) {
  const statCards = [
    { label: 'Total Post', value: stats.total_posts, color: 'bg-green-500' },
    { label: 'Post Dipublikasi', value: stats.published_posts, color: 'bg-teal-500' },
    { label: 'Total Proyek', value: stats.total_projects, color: 'bg-indigo-500' },
    { label: 'Total Pesan', value: stats.total_submissions, color: 'bg-red-500' },
  ];

  return (
    <>
      <Head title="Dashboard" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan data situs ProfilKorp</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                <span className="text-lg font-bold text-white">{stat.value}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pesan Masuk Terbaru</CardTitle>
          <Link
            href="/dashboard-admin/contact-submissions"
            className="text-sm text-primary hover:underline"
          >
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
                {recent_submissions.slice(0, 5).map((sub) => (
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
