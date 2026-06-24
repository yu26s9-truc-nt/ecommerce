"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginForm from "@/components/forms/LoginForm";

type AuthDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name: string;
    email: string;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onSignIn: () => void;
};

export default function AuthDialog({
    open,
    onOpenChange,
    name,
    email,
    onNameChange,
    onEmailChange,
    onSignIn,
}: AuthDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-dbrown">
                        Welcome back ☕
                    </DialogTitle>

                    <DialogDescription>
                        Sign in to view your order history.
                    </DialogDescription>
                </DialogHeader>

                <LoginForm
                    defaultValues={{ name, email }}
                    onSubmit={(values) => {
                        onNameChange(values.name);
                        onEmailChange(values.email);
                        onSignIn();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
