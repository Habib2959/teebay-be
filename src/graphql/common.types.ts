/**
 * Common GraphQL Type Definitions
 * Reusable types and fragments shared across all features
 */

export const commonTypeDefs = `
  scalar DateTime

  interface Timestamped {
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PageInfo {
    total: Int!
    limit: Int!
    offset: Int!
    hasMore: Boolean!
  }
`;

export const timestampedFragment = `
  createdAt
  updatedAt
`;
