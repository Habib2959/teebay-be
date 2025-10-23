/**
 * Features Index
 * Centralized exports for all GraphQL features
 */

// Auth Feature
export { authResolvers } from './auth/auth.resolver.js';
export { authTypeDefs } from './auth/auth.types.js';
export {
  registerUser,
  loginUser,
  type RegisterInput,
  type AuthResponse,
} from './auth/auth.service.js';

// User Feature
export { userResolvers } from './user/user.resolver.js';
export { userTypeDefs } from './user/user.types.js';
export {
  getUserById,
  getUserByEmail,
  updateUserProfile,
} from './user/user.service.js';

// Product Feature
export { productResolvers } from './product/product.resolver.js';
export { productTypeDefs } from './product/product.types.js';
export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getUserProducts,
  getAllProducts,
  getCategories,
  getProductSteps,
} from './product/product.service.js';
