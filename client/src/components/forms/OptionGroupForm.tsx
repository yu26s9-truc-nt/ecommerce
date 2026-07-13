"use client";
"use no memo";

import { z } from "zod";

import TagInput from "@/components/inputs/TagInput";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateOptionGroup, useUpdateOptionGroupFull } from "@/hooks/option-group";

import Form, { FormProps } from "./Form";

export const formId = "option-group-id";

const optionGroupSchema = z.object({
    name: z.string().trim().min(2, "Option group name must be at least 2 characters.").max(100, "Option group name must be at most 100 characters."),
    options: z.array(z.string().trim().min(1)).min(1, "Add at least one option."),
});

type OptionGroupFormValues = z.infer<typeof optionGroupSchema>;

type OptionGroupFormProps = FormProps<typeof optionGroupSchema> & {
    id: number | null;
};

const OptionGroupForm = ({ id, initialValues, onSuccessSubmit }: OptionGroupFormProps) => {
    const { mutate: createOptionGroup } = useCreateOptionGroup();

    const { mutate: updateOptionGroup } = useUpdateOptionGroupFull(id ?? 0);

    const handleSubmit = (values: OptionGroupFormValues) => {
        const payload = {
            ...values,
            options: values.options.map((option) => option.trim()).filter(Boolean),
        };

        const options = {
            onSuccess: () => {
                onSuccessSubmit?.();
            },
            onError: (error: unknown) => {
                console.error("Option group submit failed:", error);
            },
        };

        if (id) {
            updateOptionGroup(payload, options);
        } else {
            createOptionGroup(payload, options);
        }
    };

    return (
        <Form id={formId} schema={optionGroupSchema} onSubmit={handleSubmit} initialValues={initialValues ?? {}}>
            {(form) => (
                <>
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
                                <FormLabel>Options in Group ({field.value?.length ?? 0})</FormLabel>
                                <FormDescription>Press Enter or type , to create new option</FormDescription>
                                <FormControl>
                                    <TagInput value={field.value ?? []} onChange={field.onChange} />
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

export default OptionGroupForm;
