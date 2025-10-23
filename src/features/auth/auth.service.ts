import { prisma } from '../../config/database.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { generateToken } from '../../utils/jwt.js';
import {
  ValidationError,
  ConflictError,
  AuthenticationError,
} from '../../utils/errors.js';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

/**
 * Register a new user
 * @param input - User registration data
 * @returns User and JWT token
 */
export async function registerUser(
  input: RegisterInput
): Promise<AuthResponse> {
  // Validate input
  if (!input.email || !input.password || !input.firstName || !input.lastName) {
    throw new ValidationError('Missing required fields');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  // Hash password
  const hashedPassword = await hashPassword(input.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      address: input.address,
    },
  });

  // Generate token
  const token = generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}

/**
 * Login a user
 * @param email - User email
 * @param password - User password
 * @returns User and JWT token
 */
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  // Validate input
  if (!email || !password) {
    throw new ValidationError('Email and password required');
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Compare password
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}
