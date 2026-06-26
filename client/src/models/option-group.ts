export type OptionGroup = {
    optionGroupId: number;
    name: string;
    options: string[];
};

export type OptionGroupCreateRequest = Omit<OptionGroup, "optionGroupId">;
export type OptionGroupUpdateRequest = Omit<OptionGroup, "optionGroupId">;
