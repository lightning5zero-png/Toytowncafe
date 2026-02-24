import { prisma } from "./prisma";
import type { Product } from "@/types/product";

/** 
 * Map Prisma Product to Frontend Product type 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPrismaToProduct(p: any): Product {
    return {
        ...p,
        images: JSON.parse(p.images || "[]"),
        tags: JSON.parse(p.tags || "[]"),
        features: JSON.parse(p.features || "[]"),
        category: p.category?.name || "Uncategorized", // Access the name from joined Category
    };
}

/** Retrieve all products from the database */
export async function getAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });
    return products.map(mapPrismaToProduct);
}

/** Retrieve a single product by its slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: { category: true }
    });
    return product ? mapPrismaToProduct(product) : null;
}

/** Retrieve all unique product categories */
export async function getCategories(): Promise<string[]> {
    const categories = await prisma.category.findMany({
        select: { name: true },
        orderBy: { name: 'asc' }
    });
    return categories.map((c: { name: string }) => c.name);
}

/** Search products by name, description, or category */
export async function searchProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase().trim();
    if (!q) return getAllProducts();

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: q } },
                { description: { contains: q } },
                { category: { name: { contains: q } } },
            ]
        },
        include: { category: true }
    });

    return products.map(mapPrismaToProduct);
}

/** Filter products by category */
export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
        where: {
            category: {
                name: {
                    equals: categoryName,
                }
            }
        },
        include: { category: true }
    });
    return products.map(mapPrismaToProduct);
}
