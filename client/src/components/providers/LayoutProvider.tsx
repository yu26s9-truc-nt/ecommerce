"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { loadStoredLogin, setLogout } from "@/store/auth";
import type { RootState } from "@/store/store";

type JwtPayload = {
    sub?: string;
    auth?: string;
    exp?: number;
};

const decodeJwtPayload = (token: string): JwtPayload | null => {
    try {
        const [, payload] = token.split(".");

        if (!payload) {
            return null;
        }

        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, "=");

        return JSON.parse(atob(paddedPayload)) as JwtPayload;
    } catch {
        return null;
    }
};

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

    useEffect(() => {
        if (isAuthenticated) {
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            return;
        }

        const payload = decodeJwtPayload(token);
        const isExpired = payload?.exp ? payload.exp * 1000 <= Date.now() : false;

        if (!payload?.sub || isExpired) {
            dispatch(setLogout());
            return;
        }

        dispatch(
            loadStoredLogin({
                token,
                username: payload.sub,
                authorities:
                    payload.auth
                        ?.split(",")
                        .map((authority) => authority.trim())
                        .filter(Boolean) ?? [],
            })
        );
    }, [dispatch, isAuthenticated]);

    if (pathname === "/" || pathname === "/checkout") {
        return (
            <>
                <Header />
                {children}
                <Footer />
                <Toaster position="bottom-right" richColors />
            </>
        );
    }

    if (isAuthenticated) {
        return (
            <div className="w-full flex flex-col">
                <Header />

                <SidebarProvider className="mx-auto flex flex-1 gap-3 px-4 py-3">
                    <Sidebar />
                    <SidebarInset className="flex-1 m-0 rounded-none shadow-none overflow-auto">
                        <main className="p-4">{children}</main>
                    </SidebarInset>
                </SidebarProvider>

                <Footer />
                <Toaster position="bottom-right" richColors />
            </div>
        );
    }
    return null;
};

export default LayoutProvider;
