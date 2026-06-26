import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2",
        "whitespace-nowrap rounded-xl h-12",
        "px-[1.1rem] py-[0.65rem]",
        "text-[0.9rem] font-extrabold",
        "cursor-pointer",
        "transition-all duration-150 ease-in-out",
        "hover:-translate-y-px",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "[&_svg]:pointer-events-none",
        "[&_svg]:size-4",
        "[&_svg]:shrink-0",
    ].join(" "),
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(218,24,132,0.7)] hover:bg-[#e7339a]",

                secondary:
                    "bg-secondary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(255,103,31,0.55)] hover:bg-[#ff7733]",

                outline:
                    "bg-card text-foreground border-2 border-border hover:border-primary hover:text-primary",

                ghost: "bg-transparent text-foreground hover:bg-accent hover:text-primary",

                danger: "bg-danger text-danger-foreground hover:bg-[#fecaca]",

                link: "text-primary underline-offset-4 hover:underline p-0 shadow-none",
            },

            size: {
                default: "",
                sm: "px-4 py-2 text-sm",
                lg: "px-6 py-3 text-base",
                icon: "h-10 w-10 p-0 rounded-full",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, type, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                type={!asChild ? (type ?? "button") : undefined}
                className={cn(buttonVariants({ variant, size }), className)}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
