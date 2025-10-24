/**
 * Product GraphQL Resolver
 * Handles product-related GraphQL queries and mutations
 */

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getUserProducts,
  getAllProducts,
  getCategories,
  getProductSteps,
} from './product.service.js';
import { ProductInput, UpdateProductInput } from './product.types.js';

interface ResolverContext {
  user?: {
    userId: string;
    email: string;
  };
  req: any;
  res: any;
}

interface ProductArgs {
  id: string;
}

interface AllProductsArgs {
  limit?: number;
  offset?: number;
}

interface CreateProductArgs {
  input: ProductInput;
}

interface UpdateProductArgs {
  input: UpdateProductInput;
}

interface DeleteProductArgs {
  id: string;
}

export const productResolvers = {
  Query: {
    /**
     * Get a single product by ID
     */
    product: async (_parent: unknown, { id }: ProductArgs) => {
      return getProductById(id);
    },

    /**
     * Get all products for the current user
     */
    myProducts: async (
      _parent: unknown,
      _args: unknown,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      return getUserProducts(context.user.userId);
    },

    /**
     * Get all products with pagination
     */
    allProducts: async (
      _parent: unknown,
      { limit, offset }: AllProductsArgs
    ) => {
      return getAllProducts(limit || 10, offset || 0);
    },

    /**
     * Get product form steps for multi-step form UI
     */
    productSteps: (): ReturnType<typeof getProductSteps> => {
      return getProductSteps();
    },

    /**
     * Get all available categories
     */
    categories: async (): Promise<
      Awaited<ReturnType<typeof getCategories>>
    > => {
      return getCategories();
    },
  },

  Mutation: {
    /**
     * Create a new product
     */
    createProduct: async (
      _parent: unknown,
      { input }: CreateProductArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      return createProduct(context.user.userId, input);
    },

    /**
     * Update an existing product
     */
    updateProduct: async (
      _parent: unknown,
      { input }: UpdateProductArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      return updateProduct(context.user.userId, input);
    },

    /**
     * Delete a product
     */
    deleteProduct: async (
      _parent: unknown,
      { id }: DeleteProductArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      return deleteProduct(context.user.userId, id);
    },
  },
};
