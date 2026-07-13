"use client";

import { useDispatch } from "react-redux";
import { z } from "zod";

import { login } from "@/api/auth";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setLogin } from "@/store/auth";

import Form, { FormProps } from "./Form";

export const formId = "login-form";

const loginSchema = z.object({
    username: z.string().trim().min(2, "Username must be at least 2 characters."),
    password: z.string().trim().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = FormProps<typeof loginSchema>;

const LoginForm = ({ onSuccessSubmit }: LoginFormProps) => {
    const dispatch = useDispatch();

    const handleFormSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login(values);

            dispatch(
                setLogin({
                    token: res.data.token,
                    user: res.data.user,
                })
            );

            onSuccessSubmit?.();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Form
            id={formId}
            schema={loginSchema}
            onSubmit={handleFormSubmit}
            initialValues={{
                username: "",
                password: "",
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
                                    <Input type="password" placeholder="Your password" {...field} />
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

export default LoginForm;
