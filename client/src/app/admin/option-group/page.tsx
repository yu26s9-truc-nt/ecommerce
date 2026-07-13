"use client";

import { useState } from "react";

import OptionGroupDataTable from "@/components/data-tables/OptionGroupDataTable";
import FormDialog from "@/components/dialogs/FormDialog";
import OptionGroupForm, { formId } from "@/components/forms/OptionGroupForm";
import { Button } from "@/components/ui/button";
import { OptionGroup } from "@/models/option-group";

const Page = () => {
    const [optionGroup, setOptionGroup] = useState<OptionGroup | null>(null);

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
                    id={optionGroup?.optionGroupId ?? null}
                    initialValues={{
                        name: optionGroup?.name ?? "",
                        options: optionGroup?.options ?? [],
                    }}
                    onSuccessSubmit={() => setOptionGroup(null)}
                />
            </FormDialog>
            <OptionGroupDataTable setOptionGroup={setOptionGroup} />
        </div>
    );
};

export default Page;
