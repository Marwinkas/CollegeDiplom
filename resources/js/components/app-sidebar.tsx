import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Главная',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Сообщения',
        href: '/message',
        icon: LayoutGrid,
    },
    {
        title: 'Друзья',
        href: '/friends',
        icon: LayoutGrid,
    },
    {
        title: 'Сообщества',
        href: '/community',
        icon: LayoutGrid,
    },
    {
        title: 'Музыка',
        href: '/musics',
        icon: LayoutGrid,
    },
    {
        title: 'Видео',
        href: '/videos',
        icon: LayoutGrid,
    },
    {
        title: 'Фото',
        href: '/images',
        icon: LayoutGrid,
    },
    
];

const footerNavItems: NavItem[] = [
    {
        title: 'Техподдержка',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
