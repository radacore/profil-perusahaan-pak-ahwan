import { Link } from '@inertiajs/react';
import { Briefcase, FileText, FolderGit2, FolderOpen, Image, LayoutGrid, Mail, Settings, Star, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin, { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const kontenNavItems: NavItem[] = [
    { title: 'Tentang', href: admin.about.edit().url, icon: FileText },
    { title: 'Layanan', href: admin.services.index().url, icon: Briefcase },
    { title: 'Portofolio', href: admin.portfolio.index().url, icon: FolderOpen },
    { title: 'Blog', href: admin.blog.index().url, icon: FileText },
    { title: 'Tim', href: admin.team.index().url, icon: Users },
    { title: 'Testimoni', href: admin.testimonials.index().url, icon: Star },
];

const manajemenNavItems: NavItem[] = [
    { title: 'Pesan Masuk', href: admin.contactSubmissions.index().url, icon: Mail },
    { title: 'Media', href: admin.media.index().url, icon: Image },
];

const pengaturanNavItems: NavItem[] = [
    { title: 'Pengaturan', href: admin.settings.index().url, icon: Settings },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={kontenNavItems} label="Konten" />
                <NavMain items={manajemenNavItems} label="Manajemen" />
                <NavMain items={pengaturanNavItems} label="Pengaturan" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
