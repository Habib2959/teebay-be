/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

/**
 * Conflict error (e.g., duplicate entry)
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Conflict occurred') {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

/**
 * Format error response
 */
export function formatErrorResponse(error: Error | AppError) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  return {
    message: error.message || 'Internal server error',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
  };
}
