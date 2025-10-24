/**
 * Transaction GraphQL Type Definitions
 * Defines types for buying, renting, and transaction history
 */

export const transactionTypeDefs = `
  # Transaction Status Types
  enum BuyStatus {
    PENDING
    COMPLETED
    CANCELLED
  }

  enum RentStatus {
    PENDING
    ACTIVE
    COMPLETED
    CANCELLED
  }

  # Buy Transaction Type
  type Buy {
    id: ID!
    productId: ID!
    product: Product!
    buyerId: ID!
    buyer: User!
    sellerId: ID!
    seller: User!
    price: Float!
    status: BuyStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Rent Transaction Type
  type Rent {
    id: ID!
    productId: ID!
    product: Product!
    renterUserId: ID!
    renter: User!
    ownerUserId: ID!
    owner: User!
    startDate: DateTime!
    endDate: DateTime!
    rentalPrice: Float!
    status: RentStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Transaction History Type (unified view)
  type Transaction {
    id: ID!
    type: String! # "BUY" or "RENT"
    productId: ID!
    product: Product!
    
    # Common fields
    price: Float!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    
    # For BUY transactions
    buyerId: ID
    buyer: User
    sellerId: ID
    seller: User
    
    # For RENT transactions
    renterUserId: ID
    renter: User
    ownerUserId: ID
    owner: User
    startDate: DateTime
    endDate: DateTime
  }

  # Buy Input Type
  input BuyProductInput {
    productId: ID!
  }

  # Rent Input Type
  input RentProductInput {
    productId: ID!
    startDate: DateTime!
    endDate: DateTime!
  }

  # Transaction Filter Type
  enum TransactionType {
    BUY
    RENT
    ALL
  }

  # Query Extensions
  extend type Query {
    # Get all buys made by the user
    myBuys(status: BuyStatus): [Buy!]!
    
    # Get all buys where user is the seller
    mySales: [Buy!]!
    
    # Get all rent transactions where user is the renter
    myRentals(status: RentStatus): [Rent!]!
    
    # Get all rent transactions where user is the owner
    myLendings: [Rent!]!
    
    # Get unified transaction history
    myTransactionHistory(type: TransactionType): [Transaction!]!
  }

  # Mutation Extensions
  extend type Mutation {
    # Buy a product
    buyProduct(input: BuyProductInput!): Buy!
    
    # Rent a product
    rentProduct(input: RentProductInput!): Rent!
    
    # Cancel a buy transaction
    cancelBuy(buyId: ID!): Buy!
    
    # Cancel a rent transaction
    cancelRent(rentId: ID!): Rent!
  }
`;
