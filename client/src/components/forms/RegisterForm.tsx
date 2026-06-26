"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registerSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(2, "Username must be at least 2 characters."),
        password: z
            .string()
            .trim()
            .min(6, "Password must be at least 6 characters."),
        confirmPassword: z
            .string()
            .trim()
            .min(6, "Please confirm your password."),
        role: z.literal("USER"),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
    defaultValues?: Partial<RegisterFormValues>;
    onOpenChange: () => void;
};

export default function RegisterForm({
    defaultValues,
    onOpenChange,
}: RegisterFormProps) {
    const onSubmit = async (values: RegisterFormValues) => {
        try {
            await register(values);

            form.reset();

            onOpenChange?.();
        } catch (error) {
            console.error("Register failed:", error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: defaultValues?.username ?? "",
            password: defaultValues?.password ?? "",
            confirmPassword: defaultValues?.confirmPassword ?? "",
            role: "USER",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Choose a username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Create a password"
                                        className="pr-10"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                Confirm Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm your password"
                                        className="pr-10"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    Sign up
                </Button>
            </form>
        </Form>
    );
}
