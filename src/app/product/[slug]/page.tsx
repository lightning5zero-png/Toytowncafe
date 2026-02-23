import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: `${product.name} | Toytowncafe`,
            description: product.description,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Fetch related products on the server
    const allProducts = await getAllProducts();
    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    // Structured Data for SEO / AI Search
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Toytowncafe"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://toytowncafe.com/product/${product.slug}`,
            "priceCurrency": "THB",
            "price": product.price * 35,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
