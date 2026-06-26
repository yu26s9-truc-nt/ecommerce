"use client";
"use no memo";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TagInput } from "@/components/inputs/TagInput";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OptionGroup } from "@/models/option-group";

const optionGroupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Option group name must be at least 2 characters.")
        .max(100, "Option group name must be at most 100 characters."),
    options: z
        .array(z.string().trim().min(1))
        .min(1, "Add at least one option."),
});

export type OptionGroupFormValues = z.infer<typeof optionGroupSchema>;

type OptionGroupFormProps = {
    formId: string;
    optionGroup: OptionGroup | null;
    onSubmit: (values: OptionGroupFormValues) => void | Promise<void>;
};

export default function OptionGroupForm({
    formId,
    optionGroup,
    onSubmit,
}: OptionGroupFormProps) {
    const form = useForm<OptionGroupFormValues>({
        resolver: zodResolver(optionGroupSchema),
        defaultValues: {
            name: optionGroup?.name ?? "",
            options: optionGroup?.options ?? [],
        },
    });

    useEffect(() => {
        form.reset({
            name: optionGroup?.name ?? "",
            options: optionGroup?.options ?? [],
        });
    }, [optionGroup, form]);

    const handleSubmit = async (values: OptionGroupFormValues) => {
        await onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
                id={formId}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Option Group Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Size Options" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Options in Group ({field.value?.length ?? 0})
                            </FormLabel>
                            <FormDescription>
                                Press Enter or type , to create new option
                            </FormDescription>
                            <FormControl>
                                <TagInput
                                    value={field.value ?? []}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
