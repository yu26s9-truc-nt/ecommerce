import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            [
                "overflow-hidden rounded-[1.25rem]",
                "bg-card border border-border",
                "shadow-[0_6px_18px_-10px_rgba(42,24,16,0.18)]",
                "transition-all duration-200 ease-in-out",
                "hover:-translate-y-1",
                "hover:shadow-[0_18px_40px_-16px_rgba(218,24,132,0.25)]",
            ].join(" "),
            className
        )}
        {...props}
    />
));

Card.displayName = "Card";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-3", className)} {...props} />
));

CardContent.displayName = "CardContent";

export { Card, CardContent };
