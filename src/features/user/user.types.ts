export const userTypeDefs = `
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String!
    address: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    me: User
    user(id: ID!): User
  }

  extend type Mutation {
    updateProfile(data: UpdateProfileInput!): User!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    phone: String
    address: String
  }
`;
