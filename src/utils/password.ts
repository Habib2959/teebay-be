import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash password using bcryptjs
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

/**
 * Compare password with hash
 * @param password - Plain text password
 * @param hash - Hashed password
 * @returns Boolean indicating if password matches
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}
