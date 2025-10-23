import { GraphQLContext } from '../types/context.js';
import { extractTokenFromHeader, verifyToken } from '../utils/jwt.js';

/**
 * Authentication middleware for GraphQL context
 * Extracts and verifies JWT token from request headers
 */
export async function authMiddleware(
  req: any,
  res: any
): Promise<GraphQLContext> {
  const context: GraphQLContext = {
    req,
    res,
  };

  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const payload = verifyToken(token);
      context.user = payload;
    }
  } catch (error) {
    // Token is invalid or expired, but we don't throw here
    // because some queries/mutations don't require authentication
    console.log('Token verification error:', error);
  }

  return context;
}
