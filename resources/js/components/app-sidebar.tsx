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
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Сообщения',
        href: '/message/1',
        icon: LayoutGrid,
    },
    {
        title: 'Друзья',
        href: '/friends',
        icon: LayoutGrid,
    },
<<<<<<< HEAD
=======
    {
        title: 'Сообщества',
        href: '/community',
        icon: LayoutGrid,
    }, 
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
];

const footerNavItems: NavItem[] = [
    {
        title: 'Техподдержка',
        href: 'https://t.me/MarwinkaChannel',
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
                            <Link href="/" prefetch>
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
