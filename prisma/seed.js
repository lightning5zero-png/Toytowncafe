const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const productsPath = path.join(__dirname, '../src/data/products.json');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    console.log('Seeding categories...');
    const categoryNames = [...new Set(productsData.map(p => p.category))];

    const categoryMap = {};
    for (const name of categoryNames) {
        const category = await prisma.category.upsert({
            where: { name: name },
            update: {},
            create: { name: name },
        });
        categoryMap[name] = category.id;
    }

    console.log('Seeding products...');
    for (const p of productsData) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                name: p.name,
                slug: p.slug,
                description: p.description,
                longDescription: p.longDescription,
                price: p.price,
                originalPrice: p.originalPrice || null,
                image: p.image,
                images: JSON.stringify(p.images || []),
                brand: p.brand || null,
                categoryId: categoryMap[p.category],
                rating: p.rating || 0,
                reviewCount: p.reviewCount || 0,
                inStock: p.inStock !== undefined ? p.inStock : true,
                tags: JSON.stringify(p.tags || []),
                features: JSON.stringify(p.features || []),
            },
        });
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
