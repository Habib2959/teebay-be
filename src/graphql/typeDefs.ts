export const typeDefs = `
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String!
    address: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    me: User
    user(id: ID!): User
  }

  type Mutation {
    register(data: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(data: UpdateProfileInput!): User!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String!
    address: String!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    phone: String
    address: String
  }
`;
