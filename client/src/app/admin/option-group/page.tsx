"use client";

import { useState } from "react";

import OptionGroupDataTable from "@/components/data-tables/OptionGroupDataTable";
import FormDialog from "@/components/dialogs/FormDialog";
import OptionGroupForm, {
    OptionGroupFormValues,
} from "@/components/forms/OptionGroupForm";
import { Button } from "@/components/ui/button";
import {
    useCreateOptionGroup,
    useUpdateOptionGroupFull,
} from "@/hooks/option-group";
import { OptionGroup } from "@/models/option-group";

const Page = () => {
    const [optionGroup, setOptionGroup] = useState<OptionGroup | null>(null);
    const formId = "option-group-form";

    const { mutate: createOptionGroup } = useCreateOptionGroup();

    const { mutate: updateOptionGroup } = useUpdateOptionGroupFull(
        optionGroup?.optionGroupId ?? 0
    );

    const handleSubmit = (values: OptionGroupFormValues) => {
        const payload = {
            ...values,
            options: values.options
                .map((option) => option.trim())
                .filter(Boolean),
        };

        const options = {
            onSuccess: () => {
                setOptionGroup(null);
            },
            onError: (error: unknown) => {
                console.error("Option group submit failed:", error);
            },
        };

        if (optionGroup?.optionGroupId) {
            updateOptionGroup(payload, options);
        } else {
            createOptionGroup(payload, options);
        }
    };

    return (
        <div className="space-y-4">
            <FormDialog
                open={optionGroup != null}
                onOpenChange={() => setOptionGroup(null)}
                title={`${optionGroup?.optionGroupId ? "Update" : "Add"} Option Group`}
                footer={
                    <Button type="submit" className="w-full" form={formId}>
                        {optionGroup?.optionGroupId ? "Update" : "Add"}
                    </Button>
                }
            >
                <OptionGroupForm
                    formId={formId}
                    optionGroup={optionGroup}
                    onSubmit={handleSubmit}
                />
            </FormDialog>
            <OptionGroupDataTable setOptionGroup={setOptionGroup} />
        </div>
    );
};

export default Page;
