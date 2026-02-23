import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart } from '@/context/CartContext'
import React from 'react'

const mockProduct = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test',
    longDescription: 'Test',
    price: 100,
    image: 'img.jpg',
    images: [],
    category: 'Test',
    brand: 'Test',
    rating: 5,
    reviewCount: 1,
    inStock: true,
    tags: [],
    features: [],
}

describe('CartContext', () => {
    it('adds items to the cart', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CartProvider>{children}</CartProvider>
        )

        const { result } = renderHook(() => useCart(), { wrapper })

        act(() => {
            result.current.addToCart(mockProduct as any)
        })

        expect(result.current.totalItems).toBe(1)
        expect(result.current.items[0].quantity).toBe(1)
    })

    it('removes items from the cart', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CartProvider>{children}</CartProvider>
        )

        const { result } = renderHook(() => useCart(), { wrapper })

        act(() => {
            result.current.addToCart(mockProduct as any)
        })

        act(() => {
            result.current.removeFromCart(1)
        })

        expect(result.current.totalItems).toBe(0)
    })

    it('calculates total price correctly', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CartProvider>{children}</CartProvider>
        )

        const { result } = renderHook(() => useCart(), { wrapper })

        act(() => {
            result.current.addToCart(mockProduct as any)
            result.current.addToCart(mockProduct as any)
        })

        expect(result.current.totalPrice).toBe(200)
    })
})
