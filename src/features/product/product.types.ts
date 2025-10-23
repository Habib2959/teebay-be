/**
 * Product GraphQL Type Definitions
 * Defines the Product type, mutations, and related input types
 */

export const productTypeDefs = `
  enum RentUnit {
    HOURLY
    DAILY
    WEEKLY
    MONTHLY
  }

  enum ProductStatus {
    DRAFT
    PUBLISHED
  }

  type Category {
    id: String!
    name: String!
    createdAt: DateTime!
  }

  type Product {
    id: String!
    title: String
    description: String
    categories: [Category!]!
    purchasePrice: Float
    rentalPrice: Float
    rentUnit: RentUnit
    status: ProductStatus!
    userId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ProductStep {
    step: Int!
    title: String!
    description: String!
  }

  input CategoryInput {
    id: String!
  }

  input CreateProductInput {
    title: String
    description: String
    categoryIds: [String!]
    purchasePrice: Float
    rentalPrice: Float
    rentUnit: RentUnit
    status: ProductStatus
  }

  input UpdateProductInput {
    id: String!
    title: String
    description: String
    categoryIds: [String!]
    purchasePrice: Float
    rentalPrice: Float
    rentUnit: RentUnit
    status: ProductStatus
  }

  type ProductResponse {
    success: Boolean!
    message: String!
    product: Product
  }

  type ProductListResponse {
    success: Boolean!
    products: [Product!]!
    total: Int!
  }

  extend type Query {
    product(id: String!): Product
    myProducts(status: ProductStatus): [Product!]!
    allProducts(limit: Int, offset: Int, status: ProductStatus): ProductListResponse!
    productSteps: [ProductStep!]!
    categories: [Category!]!
  }

  extend type Mutation {
    createProduct(input: CreateProductInput!): ProductResponse!
    updateProduct(input: UpdateProductInput!): ProductResponse!
    deleteProduct(id: String!): ProductResponse!
  }
`;

export interface ProductInput {
  title?: string;
  description?: string;
  categoryIds?: string[];
  purchasePrice?: number;
  rentalPrice?: number;
  rentUnit?: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status?: 'DRAFT' | 'PUBLISHED';
}

export interface UpdateProductInput extends Partial<ProductInput> {
  id: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  product?: Record<string, unknown>;
}
