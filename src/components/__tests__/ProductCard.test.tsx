import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from '@/components/ProductCard'
import { CartProvider } from '@/context/CartContext'

// Mock the Product data
const mockProduct = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test Description',
    longDescription: 'Test Long Description',
    price: 100,
    originalPrice: 150,
    image: 'https://example.com/image.jpg',
    images: ['https://example.com/image.jpg'],
    category: 'Test Category',
    brand: 'Test Brand',
    rating: 4.5,
    reviewCount: 10,
    inStock: true,
    tags: ['new'],
    features: ['Feature 1'],
}

describe('ProductCard', () => {
    it('renders product details correctly', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        )

        expect(screen.getByText('Test Product')).toBeInTheDocument()
        expect(screen.getByText('Test Category')).toBeInTheDocument()
        // Price in THB (100 * 35 = 3,500)
        expect(screen.getByText(/3,500/)).toBeInTheDocument()
        // Discount (150 - 100) / 150 = 33.33% -> 33%
        expect(screen.getByText(/-33%/)).toBeInTheDocument()
    })

    it('shows rare badge if limited tag is present', () => {
        const limitedProduct = { ...mockProduct, tags: ['limited'] }
        render(
            <CartProvider>
                <ProductCard product={limitedProduct} />
            </CartProvider>
        )

        expect(screen.getByText('Rare')).toBeInTheDocument()
    })
})
