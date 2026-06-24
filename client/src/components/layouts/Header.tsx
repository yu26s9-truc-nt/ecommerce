"use client";

import { useState } from "react";

import AuthDialog from "@/components/dialogs/AuthDialog";
import { Button } from "@/components/ui/button";

const Header = () => {
    const [authOpen, setAuthOpen] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <>
            <header className="sticky top-0 z-40 border-b-2 border-dline bg-white">
                <div className="stripe" />

                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <a href="#/" className="flex shrink-0 items-center gap-2">
                        <Button className="h-[38px] w-[38px] shadow-[0_4px_10px_rgba(218,24,132,0.4)]">
                            DD
                        </Button>

                        <div className="text-2xl font-bold text-primary">
                            Dolicious
                        </div>
                    </a>

                    <nav className="ml-4 hidden items-center gap-1 md:flex">
                        <a href="#/orders" className="chip">
                            My Orders
                        </a>
                    </nav>

                    <div className="flex-1" />

                    <Button variant="outline" onClick={() => setAuthOpen(true)}>
                        Sign in
                    </Button>

                    <Button className="relative">
                        🛒
                        <span className="rounded-full bg-white px-2 text-xs font-black text-primary">
                            0
                        </span>
                    </Button>
                </div>
            </header>

            <AuthDialog
                open={authOpen}
                onOpenChange={setAuthOpen}
                name={name}
                email={email}
                onNameChange={setName}
                onEmailChange={setEmail}
                onSignIn={() => {
                    // sign in logic
                }}
            />
        </>
    );
};

export default Header;
