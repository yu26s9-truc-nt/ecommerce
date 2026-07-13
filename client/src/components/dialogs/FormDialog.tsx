"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CustomDialogProps = React.ComponentProps<typeof Dialog> &
    React.ComponentProps<"div"> & {
        title?: React.ReactNode;
        description?: React.ReactNode;
        footer?: React.ReactNode;
        contentProps?: Omit<React.ComponentProps<typeof DialogContent>, "children" | "className">;
    };

const CustomDialog = ({ open, title, description, footer, children, className, contentProps, ...props }: CustomDialogProps) => {
    return (
        <Dialog open={open} {...props}>
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none p-0 m-0"
                    aria-hidden="true"
                />
            )}
            <DialogContent className={cn("flex max-h-[90vh] w-[95vw] max-w-6xl flex-col gap-0 p-0", className)} {...contentProps}>
                {/* Header */}
                <DialogHeader className="flex-shrink-0 border-b px-6 py-5">
                    <DialogTitle className="text-2xl">{title}</DialogTitle>

                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

                {/* Footer */}
                {footer && <div className="flex-shrink-0 border-t px-6 py-4">{footer}</div>}
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
