"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import type { Product, CartItem } from "@/types/product";

/** Shape of the cart context value */
interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/** Custom hook to consume the cart context */
export function useCart(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

/** Provider component that manages cart state */
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback(
        (productId: number, quantity: number) => {
            if (quantity <= 0) {
                removeFromCart(productId);
                return;
            }
            setItems((prev) =>
                prev.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => setItems([]), []);
    const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),
        [items]
    );

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
        }),
        [
            items,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            toggleCart,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
