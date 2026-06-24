import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    "flex w-full h-12 rounded-xl border-2 border-input bg-background px-[0.9rem] py-[0.7rem] text-[0.9rem] font-medium placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
