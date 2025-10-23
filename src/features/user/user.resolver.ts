import { updateUserProfile } from './user.service.js';
import { GraphQLContext } from '../../types/context.js';
import { AuthenticationError } from '../../utils/errors.js';

export const userResolvers = {
  Query: {
    async me(_parent: unknown, _args: unknown, context: GraphQLContext) {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }

      const { getUserById } = await import('./user.service.js');
      return getUserById(context.user.userId);
    },

    async user(
      _parent: unknown,
      { id }: { id: string },
      _context: GraphQLContext
    ) {
      const { getUserById } = await import('./user.service.js');
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
