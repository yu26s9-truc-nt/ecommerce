import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-extrabold",
    {
        variants: {
            variant: {
                default: "bg-[var(--primary)] text-[var(--primary-foreground)]",
                secondary: "bg-[var(--dorange)] text-white",
                pending: "bg-[var(--bg-pending)] text-[var(--text-pending)]",
                prep: "bg-[var(--bg-prep)] text-[var(--primary)]",
                out: "bg-[var(--bg-out)] text-[var(--text-out)]",
                done: "bg-[var(--bg-done)] text-[var(--text-done)]",
                cancel: "bg-[var(--bg-cancel)] text-[var(--text-cancel)]",
                destructive: "bg-destructive text-destructive-foreground",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
