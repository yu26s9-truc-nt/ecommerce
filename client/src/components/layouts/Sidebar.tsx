"use client";

import {
    Boxes,
    ChartArea,
    Compass,
    FolderTree,
    GitBranch,
    type LucideIcon,
    MapPin,
    Package,
    PackageOpen,
    ShoppingBag,
    Tags,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
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
        url: "/category",
        icon: FolderTree,
    },
    {
        title: "Option",
        url: "/admin/option",
        icon: Tags,
    },
    {
        title: "Option Group",
        url: "/admin/option-group",
        icon: Boxes,
    },
    {
        title: "Rule",
        url: "/admin/rule",
        icon: GitBranch,
    },
    {
        title: "Product",
        url: "/admin/product",
        icon: Package,
    },
    {
        title: "Order",
        url: "/admin/order",
        icon: ShoppingBag,
    },
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
