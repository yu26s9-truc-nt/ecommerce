import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
    "inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-150 ease-linear whitespace-nowrap",
    {
        variants: {
            variant: {
                default:
                    "border-2 border-[var(--dline)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
                active: "bg-[var(--primary)] border-2 border-[var(--primary)] text-[var(--primary-foreground)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(({ className, variant, ...props }, ref) => (
    <button className={cn(chipVariants({ variant, className }))} ref={ref} {...props} />
));
Chip.displayName = "Chip";

export { Chip, chipVariants };
