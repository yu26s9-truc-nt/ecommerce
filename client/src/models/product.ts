export type Product = {
    productId: number;
    name: string;
    price: number;
    categoryId: number;
    description: string | null;
    subCategory: string | null;
    stock: number;
    featured: boolean;
    imageUrl: string | null;
};

export type ProductFilterRequest = {
    categoryId?: number;
    minPrice?: string | number;
    maxPrice?: string | number;
    subCategory?: string;
};

export type ProductCreateRequest = Omit<Product, "productId">;
export type ProductUpdateRequest = Omit<Product, "productId">;
