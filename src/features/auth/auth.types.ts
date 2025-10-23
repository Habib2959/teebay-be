export const authTypeDefs = `
  type AuthPayload {
    user: User!
    token: String!
  }

  extend type Mutation {
    register(data: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String!
    address: String!
  }
`;
