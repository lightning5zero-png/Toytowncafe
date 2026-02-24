import { NextResponse } from "next/server";
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items } = body as { items: { id: number; quantity: number }[] };

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: "Invalid items" }, { status: 400 });
        }

        let totalAmount = 0;
        const validatedItems = [];

        // Validation Logic: Get prices FROM SERVER DATA, not from request
        for (const cartItem of items) {
            const officialProduct = (productsData as Product[]).find(p => p.id === cartItem.id);

            if (officialProduct) {
                const itemTotal = officialProduct.price * cartItem.quantity;
                totalAmount += itemTotal;

                validatedItems.push({
                    name: officialProduct.name,
                    price: officialProduct.price,
                    quantity: cartItem.quantity,
                    subtotal: itemTotal
                });
            }
        }

        // In a real app, you would create a Stripe session or DB order here
        return NextResponse.json({
            success: true,
            message: "Price validated by backend",
            totalAmount: totalAmount,
            currency: "THB",
            items: validatedItems
        });

    } catch (error) {
        console.error("Checkout validation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
