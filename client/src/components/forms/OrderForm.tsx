import { z } from "zod";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrder } from "@/hooks/order";

import Form, { FormProps } from "./Form";

export const formId = "order-form";

const orderSchema = z.object({
    address: z.string().trim().min(1, "Address is required."),
    city: z.string().trim().min(1, "City is required."),
    state: z.string().trim().min(1, "State is required."),
    zip: z.string().trim().min(1, "Zip is required."),
});

type OrderFormValues = z.output<typeof orderSchema>;

type OrderFormProps = FormProps<typeof orderSchema>;

const OrderForm = ({ initialValues, onSuccessSubmit, onErrorSubmit }: OrderFormProps) => {
    const { mutateAsync: createOrder } = useCreateOrder();

    const handleSubmit = (values: OrderFormValues) => {
        const options = {
            onSuccess: () => {
                onSuccessSubmit?.();
            },
            onError: (error: unknown) => {
                onErrorSubmit?.();
                console.error("Category submission failed:", error);
            },
        };

        createOrder(values, options);
    };

    return (
        <Form id={formId} schema={orderSchema} onSubmit={handleSubmit} initialValues={initialValues ?? {}}>
            {(form) => (
                <>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Street address" rows={3} {...field} />
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
                </>
            )}
        </Form>
    );
};

export default OrderForm;
