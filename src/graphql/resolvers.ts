import {
  registerUser,
  loginUser,
  type RegisterInput,
} from '../services/auth.service.js';
import { updateUserProfile } from '../services/user.service.js';
import { GraphQLContext } from '../types/context.js';
import { AuthenticationError } from '../utils/errors.js';

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

export const userResolvers = {
  Query: {
    async me(_parent: unknown, _args: unknown, context: GraphQLContext) {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }

      // getUserById will be imported from user.service
      const { getUserById } = await import('../services/user.service.js');
      return getUserById(context.user.userId);
    },

    async user(
      _parent: unknown,
      { id }: { id: string },
      _context: GraphQLContext
    ) {
      const { getUserById } = await import('../services/user.service.js');
      return getUserById(id);
    },
  },

  Mutation: {
    async updateProfile(
      _parent: unknown,
      { data }: { data: Parameters<typeof updateUserProfile>[1] },
      context: GraphQLContext
    ) {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }

      return updateUserProfile(context.user.userId, data);
    },
  },
};
