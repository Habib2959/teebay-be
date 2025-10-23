import { registerUser, loginUser, type RegisterInput } from './auth.service.js';
import { GraphQLContext } from '../../types/context.js';

export const authResolvers = {
  Mutation: {
    async register(
      _parent: unknown,
      { data }: { data: RegisterInput },
      _context: GraphQLContext
    ) {
      return registerUser(data);
    },

    async login(
      _parent: unknown,
      { email, password }: { email: string; password: string },
      _context: GraphQLContext
    ) {
      return loginUser(email, password);
    },
  },
};
