"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

import { register } from "@/api/auth";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Form, { FormProps } from "./Form";

export const formId = "register-form";

const registerSchema = z
    .object({
        username: z.string().trim().min(2, "Username must be at least 2 characters."),
        password: z.string().trim().min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string().trim().min(6, "Please confirm your password."),
        role: z.literal("USER"),
    })
    .refine((values) => values.password === values.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = FormProps<typeof registerSchema>;

const RegisterForm = ({ onSuccessSubmit }: RegisterFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            await register(values);

            onSuccessSubmit?.();
        } catch (error) {
            console.error("Register failed:", error);
        }
    };

    return (
        <Form
            id={formId}
            schema={registerSchema}
            onSubmit={handleSubmit}
            initialValues={{
                username: "",
                password: "",
                confirmPassword: "",
                role: "USER",
            }}
        >
            {(form) => (
                <>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Choose a username" {...field} />
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
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            className="pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
        </Form>
    );
};

export default RegisterForm;
