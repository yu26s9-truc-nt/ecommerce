"use client";

import LoginForm from "@/components/forms/LoginForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type AuthDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-dbrown">
                        Welcome back ☕
                    </DialogTitle>

                    <DialogDescription>
                        Login to view your order history.
                    </DialogDescription>
                </DialogHeader>

                <LoginForm onOpenChange={onOpenChange} />
            </DialogContent>
        </Dialog>
    );
}
