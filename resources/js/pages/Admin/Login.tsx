import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

export default function AdminLogin() {
  const { data, setData, post, errors, processing } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    post('/dashboard-admin/login');
  }

  return (
    <>
      <Head title="Admin Login" />
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">ProfilKorp Admin</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Silakan masuk untuk mengelola situs</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoFocus
                  autoComplete="email"
                />
                <InputError message={errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <InputError message={errors.password} />
              </div>
              {errors.error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {errors.error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
