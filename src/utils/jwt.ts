import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface JwtPayload {
  userId: string;
  email: string;
}

/**
 * Generate JWT token for a user
 * @param userId - User ID
 * @param email - User email
 * @returns JWT token
 */
export function generateToken(userId: string, email: string): string {
  const payload: JwtPayload = {
    userId,
    email,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });

  return token;
}

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract token from Authorization header
 * @param authHeader - Authorization header value
 * @returns Token or null
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}
