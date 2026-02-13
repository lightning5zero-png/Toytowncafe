/** Represents a single product in the catalog */
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    tags: string[];
    features: string[];
}

/** Represents an item in the shopping cart */
export interface CartItem {
    product: Product;
    quantity: number;
}
