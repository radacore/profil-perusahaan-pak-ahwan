import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import PublicLayout from '@/layouts/public-layout';
import AdminLayout from '@/layouts/admin-layout';

const appName = import.meta.env.VITE_APP_NAME || 'ProfilKorp';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('Admin/Login'):
                return null;
            case name.startsWith('Admin/'):
                return AdminLayout;
            default:
                return PublicLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: { color: '#1E3A8A' },
});
