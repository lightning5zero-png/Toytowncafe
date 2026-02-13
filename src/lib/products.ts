import type { Product } from "@/types/product";
import productsData from "@/data/products.json";

/** Retrieve all products from the mock data source */
export function getAllProducts(): Product[] {
    return productsData as Product[];
}

/** Retrieve a single product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
    return (productsData as Product[]).find((p) => p.slug === slug);
}

/** Retrieve all unique product categories */
export function getCategories(): string[] {
    const categories = new Set(
        (productsData as Product[]).map((p) => p.category)
    );
    return Array.from(categories).sort();
}

/** Search products by name, description, or category */
export function searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return getAllProducts();

    return (productsData as Product[]).filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
}

/** Filter products by category */
export function getProductsByCategory(category: string): Product[] {
    return (productsData as Product[]).filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
    );
}
