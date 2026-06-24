"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import AuthDialog from "@/components/dialogs/AuthDialog";
import CartSheet from "@/components/sheets/CartSheet";
import { Button } from "@/components/ui/button";
import { useGetCart } from "@/hooks/cart";
import { loadStoredLogin, setLogout } from "@/store/auth";
import { setCart } from "@/store/cart";
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
        const paddedPayload = normalizedPayload.padEnd(
            Math.ceil(normalizedPayload.length / 4) * 4,
            "="
        );

        return JSON.parse(atob(paddedPayload)) as JwtPayload;
    } catch {
        return null;
    }
};

const Header = () => {
    const dispatch = useDispatch();
    const [authOpen, setAuthOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const { isAuthenticated, authorities } = useSelector(
        (state: RootState) => state.authReducer
    );

    const storedCart = useSelector((state: RootState) => state.cartReducer);
    const totalQuantity = storedCart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const isAdmin = authorities.includes("ROLE_ADMIN");

    const { data: cart = { items: {}, total: 0 } } =
        useGetCart(isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            return;
        }

        const token = localStorage.getItem("accessToken");

        if (!token) {
            return;
        }

        const payload = decodeJwtPayload(token);
        const isExpired = payload?.exp
            ? payload.exp * 1000 <= Date.now()
            : false;

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

    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(setCart(cart));
    }, [dispatch, isAuthenticated, cart]);

    const openAuth = () => {
        setAuthOpen(true);
    };

    const handleLogout = async () => {
        try {
            dispatch(setLogout());
            toast.success("Logout successfully!!!");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Error");
        }
    };

    return (
        <>
            <header className="sticky top-0 z-40 border-b-2 border-dline bg-white">
                <div className="stripe" />

                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <Button
                            type="button"
                            className="h-[38px] w-[38px] shadow-[0_4px_10px_rgba(218,24,132,0.4)]"
                        >
                            DD
                        </Button>

                        <div className="text-2xl font-bold text-primary">
                            Dolicious
                        </div>
                    </Link>

                    <div className="flex-1" />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Link href="/orders">
                                <Button type="button" variant="outline">
                                    Order History
                                </Button>
                            </Link>

                            {isAdmin && (
                                <Link href="/admin">
                                    <Button type="button">Admin</Button>
                                </Link>
                            )}

                            <Button
                                type="button"
                                className="relative"
                                onClick={() => setCartOpen(true)}
                            >
                                🛒
                                <span className="ml-2 rounded-full bg-white px-2 text-xs font-black text-primary">
                                    {totalQuantity}
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={openAuth}
                            >
                                Register
                            </Button>

                            <Button type="button" onClick={openAuth}>
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />

            <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        </>
    );
};

export default Header;
