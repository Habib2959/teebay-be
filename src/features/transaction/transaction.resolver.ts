/**
 * Transaction GraphQL Resolver
 * Handles buying, renting, and transaction history queries/mutations
 */

import {
  buyProduct,
  rentProduct,
  getUserBuys,
  getUserSales,
  getUserRentals,
  getUserLendings,
  getTransactionHistory,
  cancelBuy,
  cancelRent,
} from './transaction.service.js';

interface ResolverContext {
  user?: {
    userId: string;
    email: string;
  };
  req: any;
  res: any;
}

interface BuyProductArgs {
  input: {
    productId: string;
  };
}

interface RentProductArgs {
  input: {
    productId: string;
    startDate: Date;
    endDate: Date;
  };
}

interface BuyStatusArgs {
  status?: string;
}

interface RentStatusArgs {
  status?: string;
}

interface TransactionHistoryArgs {
  type?: string;
}

interface CancelArgs {
  buyId?: string;
  rentId?: string;
}

export const transactionResolvers = {
  Query: {
    /**
     * Get all products bought by the user
     */
    myBuys: async (
      _parent: unknown,
      { status }: BuyStatusArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await getUserBuys(context.user.userId, status);
      return result.buys;
    },

    /**
     * Get all products sold by the user
     */
    mySales: async (
      _parent: unknown,
      _args: unknown,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await getUserSales(context.user.userId);
      return result.sales;
    },

    /**
     * Get all rentals for the user (as renter)
     */
    myRentals: async (
      _parent: unknown,
      { status }: RentStatusArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await getUserRentals(context.user.userId, status);
      return result.rentals;
    },

    /**
     * Get all lendings for the user (as owner)
     */
    myLendings: async (
      _parent: unknown,
      _args: unknown,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await getUserLendings(context.user.userId);
      return result.lendings;
    },

    /**
     * Get unified transaction history
     */
    myTransactionHistory: async (
      _parent: unknown,
      { type }: TransactionHistoryArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await getTransactionHistory(context.user.userId, type);
      return result.transactions;
    },
  },

  Mutation: {
    /**
     * Buy a product
     */
    buyProduct: async (
      _parent: unknown,
      { input }: BuyProductArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await buyProduct(context.user.userId, input);
      return result.buy;
    },

    /**
     * Rent a product
     */
    rentProduct: async (
      _parent: unknown,
      { input }: RentProductArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      const result = await rentProduct(context.user.userId, input);
      return result.rent;
    },

    /**
     * Cancel a buy transaction
     */
    cancelBuy: async (
      _parent: unknown,
      { buyId }: CancelArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      if (!buyId) {
        throw new Error('buyId is required');
      }
      const result = await cancelBuy(context.user.userId, buyId);
      return result.buy;
    },

    /**
     * Cancel a rent transaction
     */
    cancelRent: async (
      _parent: unknown,
      { rentId }: CancelArgs,
      context: ResolverContext
    ) => {
      if (!context.user?.userId) {
        throw new Error('Authentication required');
      }
      if (!rentId) {
        throw new Error('rentId is required');
      }
      const result = await cancelRent(context.user.userId, rentId);
      return result.rent;
    },
  },
};
