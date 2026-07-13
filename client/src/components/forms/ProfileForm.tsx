import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateProfile } from "@/hooks/profile";

import Form, { FormProps } from "./Form";

const profileSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
    lastName: z.string().trim().default(""),
    phone: z.string().trim().default(""),
    email: z.string().trim().email("Please enter a valid email address.").or(z.literal("")),
    address: z.string().trim().default(""),
    city: z.string().trim().default(""),
    state: z.string().trim().default(""),
    zip: z.string().trim().default(""),
});

type ProfileFormValues = z.output<typeof profileSchema>;

type ProfileFormProps = FormProps<typeof profileSchema>;

const ProfileForm = ({ initialValues }: ProfileFormProps) => {
    const { mutate: updateProfile } = useUpdateProfile();

    const handleSubmit = (values: ProfileFormValues) => {
        const options = {
            onError: (error: unknown) => {
                console.error("Option group submit failed:", error);
            },
        };

        updateProfile(values, options);
    };

    return (
        <Form schema={profileSchema} onSubmit={handleSubmit} initialValues={initialValues ?? {}}>
            {(form) => (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Springfield" {...field} />
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
                                        <Input placeholder="IL" {...field} />
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
                                        <Input placeholder="62704" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        Save Profile
                    </Button>
                </>
            )}
        </Form>
    );
};

export default ProfileForm;
