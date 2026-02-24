import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getAllProducts } from '../products'
import { prisma } from '../prisma'

// Mock prisma
vi.mock('../prisma', () => ({
    prisma: {
        product: {
            findMany: vi.fn(),
        },
    },
}))

describe('products lib', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('getAllProducts maps database data correctly to frontend type', async () => {
        const mockDbProducts = [
            {
                id: 1,
                name: 'DB Product',
                slug: 'db-product',
                description: 'Desc',
                price: 100,
                images: JSON.stringify(['img1.jpg']),
                tags: JSON.stringify(['tag1']),
                features: JSON.stringify(['feat1']),
                category: { name: 'DB Category' },
                inStock: true,
                rating: 5,
                reviewCount: 1,
            },
        ]

        // @ts-expect-error
        prisma.product.findMany.mockResolvedValue(mockDbProducts)

        const result = await getAllProducts()

        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('DB Product')
        expect(result[0].category).toBe('DB Category')
        expect(Array.isArray(result[0].images)).toBe(true)
        expect(result[0].images![0]).toBe('img1.jpg')
    })
})
