"use client";
"use no memo";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm, DefaultValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type BaseFormProps<T extends z.ZodObject<z.ZodRawShape>> = {
    id?: string;
    schema: T;
    initialValues: DefaultValues<z.input<T>>;
    onSubmit: SubmitHandler<z.output<T>>;
    onSubmittingChange?: (isSubmitting: boolean) => void;
    children: (form: UseFormReturn<z.input<T>, unknown, z.output<T>>) => React.ReactNode;
    className?: string;
};

export type FormProps<T extends z.ZodObject<z.ZodRawShape>> = {
    initialValues?: DefaultValues<z.input<T>>;
    onSubmittingChange?: (isSubmitting: boolean) => void;
    onSuccessSubmit?: (values?: z.output<T>) => void;
    onErrorSubmit?: () => void;
};

const BaseForm = <T extends z.ZodObject<z.ZodRawShape>>({
    id,
    schema,
    initialValues,
    onSubmit,
    onSubmittingChange,
    children,
    className,
}: BaseFormProps<T>) => {
    const form = useForm<z.input<T> & FieldValues, unknown, z.output<T> & FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });

    useEffect(() => {
        onSubmittingChange?.(form.formState.isSubmitting);
    }, [form.formState.isSubmitting, onSubmittingChange]);

    return (
        <Form {...form}>
            <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
                {children(form)}
            </form>
        </Form>
    );
};

export default BaseForm;
