"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import Dialog from "@/components/dialogs/FormDialog";
import LoginForm, { formId as loginFormId } from "@/components/forms/LoginForm";
import RegisterForm, { formId as registerFormId } from "@/components/forms/RegisterForm";
import CartSheet from "@/components/sheets/CartSheet";
import { Button } from "@/components/ui/button";
import { useGetCart } from "@/hooks/cart";
import { setLogout } from "@/store/auth";
import { setCart } from "@/store/cart";
import type { RootState } from "@/store/store";

const DEFAULT_CART = { items: {}, total: 0 };

const Header = () => {
    const dispatch = useDispatch();
    const [authOpen, setAuthOpen] = useState("");
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();

    const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

    const storedCart = useSelector((state: RootState) => state.cartReducer);
    const totalQuantity = storedCart.items.reduce((acc, item) => acc + item.quantity, 0);

    const { data: cart = DEFAULT_CART } = useGetCart(isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) return;
        dispatch(setCart(cart));
    }, [dispatch, isAuthenticated, cart]);

    const handleLogout = async () => {
        try {
            dispatch(setLogout());
            toast.success("Logout successfully!!!");
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Error");
        }
    };

    return (
        <>
            <header className="h-20 sticky top-0 z-40 border-b-2 border-dline bg-white">
                <div className="stripe" />

                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <Button type="button" className="h-[38px] w-[38px] shadow-[0_4px_10px_rgba(218,24,132,0.4)] rounded-full">
                            D
                        </Button>

                        <div className="text-2xl font-bold text-primary">Dolicious</div>
                    </Link>

                    <div className="flex-1" />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Link href="/profile">
                                <Button type="button">Account</Button>
                            </Link>

                            <Button type="button" className="relative" onClick={() => setCartOpen(true)}>
                                🛒
                                <span className="ml-2 rounded-full bg-white px-2 text-xs font-black text-primary">{totalQuantity}</span>
                            </Button>

                            <Button type="button" variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" onClick={() => setAuthOpen("register")}>
                                Register
                            </Button>

                            <Button type="button" onClick={() => setAuthOpen("login")}>
                                Login
                            </Button>
                        </div>
                    )}
                </div>
            </header>

            <Dialog
                open={authOpen === "login"}
                onOpenChange={() => setAuthOpen("")}
                title="Welcome back"
                description="Login to view your order history"
                footer={
                    <Button type="submit" className="w-full" form={loginFormId}>
                        Login
                    </Button>
                }
            >
                <LoginForm onSuccessSubmit={() => setAuthOpen("")} />
            </Dialog>

            <Dialog
                open={authOpen === "register"}
                onOpenChange={() => setAuthOpen("")}
                title="Welcome!!!"
                description="Register to explore our wonderfull menu"
                footer={
                    <Button type="submit" className="w-full" form={registerFormId}>
                        Register
                    </Button>
                }
            >
                <RegisterForm onSuccessSubmit={() => setAuthOpen("")} />
            </Dialog>

            <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
        </>
    );
};

export default Header;
