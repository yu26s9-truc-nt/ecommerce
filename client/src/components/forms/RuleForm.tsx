/*"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export type Rule = {
    ruleId?: number;
    targetId: number | null;
    target: string | null;
    type: string;
    mode: string | null;
    conditionMap: string | null;
    config: string | null;
};

const jsonStringSchema = z
    .string()
    .trim()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => {
        if (!value) return true;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    }, "Must be valid JSON.");

const ruleSchema = z.object({
    targetId: z
        .string()
        .trim()
        .optional()
        .transform((value) => {
            if (!value) return null;
            const parsed = Number(value);
            return Number.isNaN(parsed) ? null : parsed;
        }),
    target: z.string().trim().max(20, "Target must be at most 20 characters.").optional().or(z.literal("")),
    type: z
        .string()
        .trim()
        .min(1, "Type is required.")
        .max(20, "Type must be at most 20 characters."),
    mode: z.string().trim().max(20, "Mode must be at most 20 characters.").optional().or(z.literal("")),
    conditionMap: jsonStringSchema,
    config: jsonStringSchema,
});

type RuleFormInput = z.input<typeof ruleSchema>;
type RuleFormValues = z.output<typeof ruleSchema>;

type RuleFormProps = {
    rule: Rule | null;
    onSubmit: (values: RuleFormValues) => void | Promise<void>;
    onCancel?: () => void;
};

export default function RuleForm({
    rule,
    onSubmit,
    onCancel,
}: RuleFormProps) {
    const form = useForm<RuleFormInput, undefined, RuleFormValues>({
        resolver: zodResolver(ruleSchema),
        defaultValues: {
            targetId: rule?.targetId?.toString() ?? "",
            target: rule?.target ?? "",
            type: rule?.type ?? "",
            mode: rule?.mode ?? "",
            conditionMap: rule?.conditionMap ?? "",
            config: rule?.config ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            targetId: rule?.targetId?.toString() ?? "",
            target: rule?.target ?? "",
            type: rule?.type ?? "",
            mode: rule?.mode ?? "",
            conditionMap: rule?.conditionMap ?? "",
            config: rule?.config ?? "",
        });
    }, [rule, form]);

    const handleSubmit = async (values: RuleFormValues) => {
        await onSubmit(values);
        form.reset(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="targetId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target ID</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="123"
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="category"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input placeholder="some_type" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mode</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="default"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="conditionMap"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Condition Map (JSON)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='{"min": 1, "max": 5}'
                                    rows={5}
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="config"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Config (JSON)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='{"enabled": true}'
                                    rows={5}
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                    >
                        {rule?.ruleId ? "Update" : "Add"} Rule
                    </Button>
                </div>
            </form>
        </Form>
    );
}*/
