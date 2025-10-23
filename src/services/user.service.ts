import { prisma } from '../config/database.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

/**
 * Get user by ID
 * @param userId - User ID
 * @returns User object
 */
export async function getUserById(userId: string) {
  if (!userId) {
    throw new ValidationError('User ID required');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
}

/**
 * Get user by email
 * @param email - User email
 * @returns User object
 */
export async function getUserByEmail(email: string) {
  if (!email) {
    throw new ValidationError('Email required');
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
}

/**
 * Update user profile
 * @param userId - User ID
 * @param data - Update data
 * @returns Updated user object
 */
export async function updateUserProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
  }
) {
  if (!userId) {
    throw new ValidationError('User ID required');
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}
