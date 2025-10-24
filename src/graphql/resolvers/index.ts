import { authResolvers } from '../../features/auth/auth.resolver.js';
import { userResolvers } from '../../features/user/user.resolver.js';
import { productResolvers } from '../../features/product/product.resolver.js';
import { transactionResolvers } from '../../features/transaction/transaction.resolver.js';
import { GraphQLScalarType } from 'graphql';

/**
 * Custom DateTime scalar resolver
 */
const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date time scalar',
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  },
  parseValue(value: unknown): Date {
    return new Date(value as string | number);
  },
});

/**
 * Combine all feature resolvers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createResolvers(): any {
  return {
    DateTime: dateTimeScalar,
    Query: {
      ...userResolvers.Query,
      ...productResolvers.Query,
      ...transactionResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...userResolvers.Mutation,
      ...productResolvers.Mutation,
      ...transactionResolvers.Mutation,
    },
  };
}
