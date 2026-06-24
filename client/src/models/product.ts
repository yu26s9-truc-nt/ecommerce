export type Product = {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
    description?: string | null;
    subCategory?: string | null;
    stock: number;
    featured: boolean;
    imageUrl?: string | null;
};

export type ProductFilterRequest = {
    categoryId?: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    subCategory?: string;
};

export type ProductCreateRequest = {
    name: string;
    price: string | number;
    categoryId: number;
    description?: string;
    subCategory?: string;
    stock?: number;
    featured?: boolean;
    imageUrl?: string;
};

export type ProductUpdateRequest = {
    name?: string;
    price?: string | number;
    categoryId?: number;
    description?: string;
    subCategory?: string;
    stock?: number;
    featured?: boolean;
    imageUrl?: string;
};
