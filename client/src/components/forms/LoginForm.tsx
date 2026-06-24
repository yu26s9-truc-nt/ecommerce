"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const loginSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("Please enter a valid email address."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
    defaultValues?: Partial<LoginFormValues>;
    onSubmit: (values: LoginFormValues) => void | Promise<void>;
};

export default function LoginForm({ defaultValues, onSubmit }: LoginFormProps) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            email: defaultValues?.email ?? "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                Name
                            </FormLabel>

                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-[0.3rem] block text-[0.78rem] font-bold uppercase tracking-[0.5px] text-dbrown">
                                Email
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@dolicious.com"
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
                    Sign in
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                    Demo only — no password needed.
                </p>
            </form>
        </Form>
    );
}
