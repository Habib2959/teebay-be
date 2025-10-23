import { prisma } from '../../config/database.js';
import { ProductInput, UpdateProductInput } from './product.types.js';

/**
 * Create a new product
 */
export async function createProduct(userId: string, input: ProductInput) {
  try {
    const product = await prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        purchasePrice: input.purchasePrice,
        rentalPrice: input.rentalPrice,
        rentUnit: input.rentUnit,
        status: input.status || 'DRAFT',
        userId,
        categories: input.categoryIds
          ? {
              connect: input.categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        categories: true,
        user: true,
      },
    });

    return {
      success: true,
      message: 'Product created successfully',
      product,
    };
  } catch (error) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(userId: string, input: UpdateProductInput) {
  const { id, ...updateData } = input;

  try {
    // Check if product exists and belongs to user
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.userId !== userId) {
      throw new Error('You do not have permission to update this product');
    }

    // Prepare update data
    const data: Record<string, unknown> = {};

    if (updateData.title) data.title = updateData.title;
    if (updateData.description) data.description = updateData.description;
    if (updateData.purchasePrice !== undefined)
      data.purchasePrice = updateData.purchasePrice;
    if (updateData.rentalPrice !== undefined)
      data.rentalPrice = updateData.rentalPrice;
    if (updateData.rentUnit) data.rentUnit = updateData.rentUnit;

    if (updateData.categoryIds) {
      data.categories = {
        set: updateData.categoryIds.map((id: string) => ({ id })),
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
      include: {
        categories: true,
        user: true,
      },
    });

    return {
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  } catch (error) {
    throw new Error(`Failed to update product: ${(error as Error).message}`);
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(userId: string, productId: string) {
  try {
    // Check if product exists and belongs to user
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.userId !== userId) {
      throw new Error('You do not have permission to delete this product');
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    throw new Error(`Failed to delete product: ${(error as Error).message}`);
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
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
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    throw new Error(`Failed to fetch product: ${(error as Error).message}`);
  }
}

/**
 * Get all products for a user
 */
export async function getUserProducts(userId: string, status?: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  } catch (error) {
    throw new Error(
      `Failed to fetch user products: ${(error as Error).message}`
    );
  }
}

/**
 * Get all products with pagination
 */
export async function getAllProducts(limit = 10, offset = 0, status?: string) {
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: status ? { status } : undefined,
        take: limit,
        skip: offset,
        include: {
          categories: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count(status ? { where: { status } } : undefined),
    ]);

    return {
      success: true,
      products,
      total,
    };
  } catch (error) {
    throw new Error(`Failed to fetch products: ${(error as Error).message}`);
  }
}

/**
 * Get all categories
 */
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return categories;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${(error as Error).message}`);
  }
}

/**
 * Get product form steps
 * Returns metadata about the multi-step form
 */
export function getProductSteps() {
  return [
    {
      step: 1,
      title: 'Product Title',
      description: 'Enter the name of your product',
    },
    {
      step: 2,
      title: 'Description',
      description: 'Provide a detailed description of your product',
    },
    {
      step: 3,
      title: 'Categories',
      description: 'Select one or more categories for your product',
    },
    {
      step: 4,
      title: 'Pricing - Purchase',
      description: 'Set the purchase price for your product',
    },
    {
      step: 5,
      title: 'Pricing - Rental',
      description: 'Set the rental price and unit (optional)',
    },
    {
      step: 6,
      title: 'Image',
      description: 'Upload a product image (optional)',
    },
    {
      step: 7,
      title: 'Review',
      description: 'Review and confirm your product details',
    },
  ];
}
