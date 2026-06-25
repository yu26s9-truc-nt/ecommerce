"use client";

import {
    Boxes,
    FolderTree,
    type LucideIcon,
    Package,
    ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { RootState } from "@/store/store";

interface IMenuItem {
    title: string;
    url?: string;
    icon: LucideIcon;
    sub?: { title: string; url: string }[];
}

const userMenuItems: IMenuItem[] = [
    {
        title: "Profile",
        url: "/profile",
        icon: ShoppingBag,
    },
    {
        title: "Order",
        url: "/user/order",
        icon: ShoppingBag,
    },
];

const adminMenuItems: IMenuItem[] = [
    {
        title: "Profile",
        url: "/profile",
        icon: ShoppingBag,
    },
    /*{
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartArea,
    },*/
    {
        title: "Category",
        url: "/admin/category",
        icon: FolderTree,
    },
    {
        title: "Option Group",
        url: "/admin/option-group",
        icon: Boxes,
    },
    /*{
        title: "Rule",
        url: "/admin/rule",
        icon: GitBranch,
    },*/
    {
        title: "Product",
        url: "/admin/product",
        icon: Package,
    },
    /*{
        title: "Order",
        url: "/admin/order",
        icon: ShoppingBag,
    },*/
];

const AppSidebarMenu = () => {
    const { authorities } = useSelector(
        (state: RootState) => state.authReducer
    );

    const pathname = usePathname();

    const isAdmin =
        authorities?.includes("ROLE_ADMIN") || authorities?.includes("ADMIN");

    let menuItems = userMenuItems;

    if (isAdmin) {
        menuItems = adminMenuItems;
    }

    return (
        <SidebarMenu>
            {menuItems.map(({ title, url, icon: Icon, sub }) => (
                <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                        asChild
                        isActive={url ? pathname.startsWith(url) : false}
                    >
                        <Link href={url ?? "#"}>
                            <Icon />
                            {title}
                        </Link>
                    </SidebarMenuButton>

                    {sub && (
                        <SidebarMenuSub>
                            {sub.map(({ title, url }) => (
                                <SidebarMenuSubItem key={title}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={pathname.startsWith(url)}
                                    >
                                        <Link href={url}>{title}</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};

const AppSidebar = () => {
    return (
        <Sidebar className="top-20" collapsible="none">
            <SidebarContent>
                <SidebarGroup>
                    <AppSidebarMenu />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
