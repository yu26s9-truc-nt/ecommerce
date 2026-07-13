"use client";

import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    if (type === "password") {
        return (
            <div className="relative">
                <input
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "flex w-full h-12 rounded-xl border-2 border-input bg-background px-[0.9rem] py-[0.7rem] pr-10 text-[0.9rem] font-medium placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                        className
                    )}
                    {...props}
                />

                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    {!showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        );
    }

    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                "flex w-full h-12 rounded-xl border-2 border-input bg-background px-3 py-2 text-sm font-medium placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                className
            )}
            {...props}
        />
    );
});

Input.displayName = "Input";

export { Input };
