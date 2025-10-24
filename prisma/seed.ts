import { prisma } from '../src/config/database.js';
import { hashPassword } from '../src/utils/password.js';

/**
 * Seed database with initial data
 * Run with: npm run prisma:seed
 */
async function main() {
  console.log('🌱 Seeding database...');

  try {
    // Clear existing data
    await prisma.sale.deleteMany({});
    await prisma.rental.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.listing.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // Create demo users
    const user1 = await prisma.user.create({
      data: {
        email: 'alice@example.com',
        password: await hashPassword('password123'),
        firstName: 'Alice',
        lastName: 'Johnson',
        phone: '+1-555-0101',
        address: '123 Main St, Springfield, IL 62701',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'bob@example.com',
        password: await hashPassword('password123'),
        firstName: 'Bob',
        lastName: 'Smith',
        phone: '+1-555-0102',
        address: '456 Oak Ave, Springfield, IL 62702',
      },
    });

    const user3 = await prisma.user.create({
      data: {
        email: 'charlie@example.com',
        password: await hashPassword('password123'),
        firstName: 'Charlie',
        lastName: 'Brown',
        phone: '+1-555-0103',
        address: '789 Pine Rd, Springfield, IL 62703',
      },
    });

    console.log('✅ Created demo users');

    // Create predefined categories
    const electronics = await prisma.category.create({
      data: { name: 'ELECTRONICS' },
    });

    const furniture = await prisma.category.create({
      data: { name: 'FURNITURE' },
    });

    const homeAppliances = await prisma.category.create({
      data: { name: 'HOME APPLIANCES' },
    });

    const sportingGoods = await prisma.category.create({
      data: { name: 'SPORTING GOODS' },
    });

    const outdoor = await prisma.category.create({
      data: { name: 'OUTDOOR' },
    });

    const toys = await prisma.category.create({
      data: { name: 'TOYS' },
    });

    console.log('✅ Created predefined categories');

    // Create sample products
    const product1 = await prisma.product.create({
      data: {
        title: 'MacBook Pro 14"',
        description: 'Excellent condition MacBook Pro with M2 chip, 16GB RAM',
        purchasePrice: 1800.0,
        rentalPrice: 75.0,
        rentUnit: 'DAILY',
        userId: user1.id,
        categories: {
          connect: [{ id: electronics.id }],
        },
      },
    });

    const product2 = await prisma.product.create({
      data: {
        title: 'Mountain Bike',
        description: 'Trek mountain bike, rarely used, perfect condition',
        purchasePrice: 1200.0,
        rentalPrice: 35.0,
        rentUnit: 'DAILY',
        userId: user2.id,
        categories: {
          connect: [{ id: sportingGoods.id }, { id: outdoor.id }],
        },
      },
    });

    const product3 = await prisma.product.create({
      data: {
        title: 'IKEA Desk',
        description: 'Minimalist white desk, barely used',
        purchasePrice: 150.0,
        rentalPrice: 15.0,
        rentUnit: 'DAILY',
        userId: user1.id,
        categories: {
          connect: [{ id: furniture.id }],
        },
      },
    });

    const product4 = await prisma.product.create({
      data: {
        title: 'Portable Air Conditioner',
        description: 'Compact portable AC unit, energy efficient',
        purchasePrice: 350.0,
        rentalPrice: 20.0,
        rentUnit: 'DAILY',
        userId: user3.id,
        categories: {
          connect: [{ id: homeAppliances.id }],
        },
      },
    });

    const product5 = await prisma.product.create({
      data: {
        title: 'LEGO Star Wars Set',
        description: 'Complete LEGO Star Wars collector set, unopened',
        purchasePrice: 250.0,
        rentalPrice: 10.0,
        rentUnit: 'WEEKLY',
        userId: user2.id,
        categories: {
          connect: [{ id: toys.id }],
        },
      },
    });

    const product6 = await prisma.product.create({
      data: {
        title: 'Camping Tent',
        description: '4-person tent with waterproof coating and carrying bag',
        purchasePrice: 200.0,
        rentalPrice: 25.0,
        rentUnit: 'DAILY',
        userId: user1.id,
        categories: {
          connect: [{ id: outdoor.id }, { id: sportingGoods.id }],
        },
      },
    });

    console.log('✅ Created sample products with multiple categories');

    // Create sample listings
    const listing1 = await prisma.listing.create({
      data: {
        title: 'Mountain Bike',
        description: 'High-quality mountain bike in excellent condition',
        category: 'Sports & Outdoors',
        condition: 'like-new',
        price: 500.0,
        rentalPrice: 25.0,
        userId: user1.id,
      },
    });

    const listing2 = await prisma.listing.create({
      data: {
        title: 'Laptop Stand',
        description: 'Adjustable laptop stand for better ergonomics',
        category: 'Electronics',
        condition: 'good',
        price: 35.0,
        userId: user2.id,
      },
    });

    const listing3 = await prisma.listing.create({
      data: {
        title: 'Camping Tent',
        description: '4-person camping tent with rain fly',
        category: 'Sports & Outdoors',
        condition: 'new',
        price: 150.0,
        rentalPrice: 15.0,
        userId: user1.id,
      },
    });

    console.log('✅ Created sample listings');

    // Create sample sales
    const sale1 = await prisma.sale.create({
      data: {
        listingId: listing2.id,
        buyerId: user2.id,
        sellerId: user1.id,
        price: 35.0,
        status: 'completed',
      },
    });

    console.log('✅ Created sample sales');

    // Create sample rentals
    const rental1 = await prisma.rental.create({
      data: {
        listingId: listing1.id,
        renterUserId: user3.id,
        ownerUserId: user1.id,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-08'),
        rentalPrice: 175.0, // 7 days × $25
        status: 'completed',
      },
    });

    console.log('✅ Created sample rentals');

    // Create sample buys
    const buy1 = await prisma.buy.create({
      data: {
        productId: product1.id,
        buyerId: user2.id,
        sellerId: user1.id,
        price: product1.purchasePrice || 1800.0,
        status: 'COMPLETED',
      },
    });

    const buy2 = await prisma.buy.create({
      data: {
        productId: product3.id,
        buyerId: user3.id,
        sellerId: user1.id,
        price: product3.purchasePrice || 150.0,
        status: 'COMPLETED',
      },
    });

    console.log('✅ Created sample buys');

    // Create sample rents
    const rent1 = await prisma.rent.create({
      data: {
        productId: product2.id,
        renterUserId: user1.id,
        ownerUserId: user2.id,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-11-05'),
        rentalPrice: product2.rentalPrice || 35.0,
        status: 'ACTIVE',
      },
    });

    const rent2 = await prisma.rent.create({
      data: {
        productId: product4.id,
        renterUserId: user1.id,
        ownerUserId: user3.id,
        startDate: new Date('2024-11-10'),
        endDate: new Date('2024-11-12'),
        rentalPrice: product4.rentalPrice || 20.0,
        status: 'ACTIVE',
      },
    });

    const rent3 = await prisma.rent.create({
      data: {
        productId: product6.id,
        renterUserId: user2.id,
        ownerUserId: user1.id,
        startDate: new Date('2024-11-20'),
        endDate: new Date('2024-11-22'),
        rentalPrice: product6.rentalPrice || 25.0,
        status: 'COMPLETED',
      },
    });

    console.log('✅ Created sample rents');

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
