import { authTypeDefs } from '../features/auth/auth.types.js';
import { userTypeDefs } from '../features/user/user.types.js';
import { productTypeDefs } from '../features/product/product.types.js';
import { commonTypeDefs } from './common.types.js';

/**
 * Base GraphQL Schema
 * Combines type definitions from all features
 */
export const baseTypeDefs = `
  type Query {
    health: String
  }

  type Mutation {
    _dummy: String
  }
`;

/**
 * Complete GraphQL Schema
 * Combines base types with all feature types
 */
export const typeDefs = `
  ${commonTypeDefs}
  ${baseTypeDefs}
  ${authTypeDefs}
  ${userTypeDefs}
  ${productTypeDefs}
`;
