export type Category = {
    categoryId: number;
    name: string;
    description?: string | null;
};

export type GetCategoriesParams = void;

export type CreateCategoryRequest = {
    name: string;
    description?: string;
};

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;
