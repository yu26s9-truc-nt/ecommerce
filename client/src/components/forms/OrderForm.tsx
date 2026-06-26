"use client";
"use no memo";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const orderSchema = z.object({
    address: z.string().trim().min(1, "Address is required."),
    city: z.string().trim().min(1, "City is required."),
    state: z.string().trim().min(1, "State is required."),
    zip: z.string().trim().min(1, "Zip is required."),
});

type OrderFormInput = z.input<typeof orderSchema>;
export type OrderFormValues = z.output<typeof orderSchema>;

type OrderFormProps = {
    formId: string;
    onSubmit: (values: OrderFormValues) => void | Promise<void>;
    defaultValues?: Partial<OrderFormValues>;
};

export default function OrderForm({
    formId,
    onSubmit,
    defaultValues,
}: OrderFormProps) {
    const form = useForm<OrderFormInput, undefined, OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: defaultValues?.address ?? "",
            city: defaultValues?.city ?? "",
            state: defaultValues?.state ?? "",
            zip: defaultValues?.zip ?? "",
        },
    });

    const handleSubmit = async (values: OrderFormValues) => {
        await onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Street address"
                                    rows={3}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phoenix" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="AZ" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip</FormLabel>
                                <FormControl>
                                    <Input placeholder="85001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}
