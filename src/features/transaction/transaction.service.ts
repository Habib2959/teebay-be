/**
 * Transaction Service
 * Handles buying, renting, and transaction history operations
 */

import { prisma } from '../../config/database.js';

interface BuyProductInput {
  productId: string;
}

interface RentProductInput {
  productId: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Buy a product
 */
export async function buyProduct(buyerId: string, input: BuyProductInput) {
  const { productId } = input;

  try {
    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.purchasePrice) {
      throw new Error('Product is not available for purchase');
    }

    if (product.userId === buyerId) {
      throw new Error('You cannot buy your own product');
    }

    // Create buy transaction
    const buy = await prisma.buy.create({
      data: {
        productId,
        buyerId,
        sellerId: product.userId,
        price: product.purchasePrice,
        status: 'COMPLETED',
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      buy,
    };
  } catch (error) {
    throw new Error(`Failed to buy product: ${(error as Error).message}`);
  }
}

/**
 * Rent a product
 * Validates that rental times don't overlap
 */
export async function rentProduct(
  renterUserId: string,
  input: RentProductInput
) {
  const { productId, startDate, endDate } = input;

  try {
    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      throw new Error('Start date must be before end date');
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (!product.rentalPrice) {
      throw new Error('Product is not available for rent');
    }

    if (product.userId === renterUserId) {
      throw new Error('You cannot rent your own product');
    }

    // Check for overlapping rentals
    const overlappingRental = await prisma.rent.findFirst({
      where: {
        productId,
        status: { in: ['PENDING', 'ACTIVE'] },
        OR: [
          {
            startDate: { lt: new Date(endDate) },
            endDate: { gt: new Date(startDate) },
          },
        ],
      },
    });

    if (overlappingRental) {
      throw new Error('Product is already rented during the requested period');
    }

    // Create rent transaction
    const rent = await prisma.rent.create({
      data: {
        productId,
        renterUserId,
        ownerUserId: product.userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        rentalPrice: product.rentalPrice,
        status: 'ACTIVE',
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        renter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      rent,
    };
  } catch (error) {
    throw new Error(`Failed to rent product: ${(error as Error).message}`);
  }
}

/**
 * Get all products bought by user
 */
export async function getUserBuys(userId: string, status?: string) {
  try {
    const buys = await prisma.buy.findMany({
      where: {
        buyerId: userId,
        ...(status && { status }),
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      buys,
    };
  } catch (error) {
    throw new Error(`Failed to fetch buys: ${(error as Error).message}`);
  }
}

/**
 * Get all products sold by user
 */
export async function getUserSales(userId: string) {
  try {
    const sales = await prisma.buy.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      sales,
    };
  } catch (error) {
    throw new Error(`Failed to fetch sales: ${(error as Error).message}`);
  }
}

/**
 * Get all rentals by user (as renter)
 */
export async function getUserRentals(userId: string, status?: string) {
  try {
    const rentals = await prisma.rent.findMany({
      where: {
        renterUserId: userId,
        ...(status && { status }),
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        renter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      rentals,
    };
  } catch (error) {
    throw new Error(`Failed to fetch rentals: ${(error as Error).message}`);
  }
}

/**
 * Get all lendings by user (as owner)
 */
export async function getUserLendings(userId: string) {
  try {
    const lendings = await prisma.rent.findMany({
      where: {
        ownerUserId: userId,
      },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        renter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      lendings,
    };
  } catch (error) {
    throw new Error(`Failed to fetch lendings: ${(error as Error).message}`);
  }
}

/**
 * Get unified transaction history
 */
export async function getTransactionHistory(userId: string, type?: string) {
  try {
    const transactions: any[] = [];

    if (!type || type === 'BUY') {
      // Get all buys (as buyer and seller)
      const buys = await prisma.buy.findMany({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
        },
        include: {
          product: {
            include: {
              categories: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          buyer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          seller: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      transactions.push(
        ...buys.map((buy) => ({
          id: buy.id,
          type: 'BUY',
          productId: buy.productId,
          product: buy.product,
          price: buy.price,
          status: buy.status,
          createdAt: buy.createdAt,
          updatedAt: buy.updatedAt,
          buyerId: buy.buyerId,
          buyer: buy.buyer,
          sellerId: buy.sellerId,
          seller: buy.seller,
          userRole: buy.buyerId === userId ? 'BUYER' : 'SELLER',
        }))
      );
    }

    if (!type || type === 'RENT') {
      // Get all rentals (as renter and owner)
      const rents = await prisma.rent.findMany({
        where: {
          OR: [{ renterUserId: userId }, { ownerUserId: userId }],
        },
        include: {
          product: {
            include: {
              categories: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          renter: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      transactions.push(
        ...rents.map((rent) => ({
          id: rent.id,
          type: 'RENT',
          productId: rent.productId,
          product: rent.product,
          price: rent.rentalPrice,
          status: rent.status,
          createdAt: rent.createdAt,
          updatedAt: rent.updatedAt,
          renterUserId: rent.renterUserId,
          renter: rent.renter,
          ownerUserId: rent.ownerUserId,
          owner: rent.owner,
          startDate: rent.startDate,
          endDate: rent.endDate,
          userRole: rent.renterUserId === userId ? 'RENTER' : 'OWNER',
        }))
      );
    }

    // Sort by createdAt descending
    transactions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return {
      success: true,
      transactions,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch transaction history: ${(error as Error).message}`
    );
  }
}

/**
 * Cancel a buy transaction
 */
export async function cancelBuy(userId: string, buyId: string) {
  try {
    const buy = await prisma.buy.findUnique({
      where: { id: buyId },
    });

    if (!buy) {
      throw new Error('Buy transaction not found');
    }

    // Only buyer or seller can cancel
    if (buy.buyerId !== userId && buy.sellerId !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedBuy = await prisma.buy.update({
      where: { id: buyId },
      data: { status: 'CANCELLED' },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      buy: updatedBuy,
    };
  } catch (error) {
    throw new Error(`Failed to cancel buy: ${(error as Error).message}`);
  }
}

/**
 * Cancel a rent transaction
 */
export async function cancelRent(userId: string, rentId: string) {
  try {
    const rent = await prisma.rent.findUnique({
      where: { id: rentId },
    });

    if (!rent) {
      throw new Error('Rent transaction not found');
    }

    // Only renter or owner can cancel
    if (rent.renterUserId !== userId && rent.ownerUserId !== userId) {
      throw new Error('Unauthorized');
    }

    const updatedRent = await prisma.rent.update({
      where: { id: rentId },
      data: { status: 'CANCELLED' },
      include: {
        product: {
          include: {
            categories: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        renter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      rent: updatedRent,
    };
  } catch (error) {
    throw new Error(`Failed to cancel rent: ${(error as Error).message}`);
  }
}
