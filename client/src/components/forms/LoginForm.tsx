"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import { login } from "@/api/auth";
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
import { setLogin } from "@/store/auth";

const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(2, "Username must be at least 2 characters."),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type Props = {
    onOpenChange?: (open: boolean) => void;
};

export default function LoginForm({ onOpenChange }: Props) {
    const dispatch = useDispatch();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login(values);

            dispatch(
                setLogin({
                    token: res.data.token,
                    user: res.data.user,
                })
            );

            form.reset();

            onOpenChange?.();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

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
                                <Input placeholder="Your username" {...field} />
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
                                <Input
                                    type="password"
                                    placeholder="Your password"
                                    {...field}
                                />
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
                    Login
                </Button>
            </form>
        </Form>
    );
}
