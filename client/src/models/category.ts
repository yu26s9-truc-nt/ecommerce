export type Category = {
    categoryId: number;
    name: string;
    description?: string | null;
};

export type GetCategoriesParams = void;

export type CategoryCreateRequest = {
    name: string;
    description?: string;
};

export type CategoryUpdateRequest = Partial<CategoryCreateRequest>;
