class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false
    this.isOperational = true;
    
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation Error",status=400) {
    super(message, status);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
class UserAlreadyExistsError extends AppError {
  constructor(message = "User is already registered") {
    super(message, 409);
  }
}
class CustomAPIError extends AppError {
  constructor(message = "Internal Server Error",statusCode=500) {
    super(message, statusCode);
  }
}
class BadRequestError extends AppError{
  constructor(message = "bad request",statusCode=400) {
    super(message, statusCode);
  }
}
module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  UserAlreadyExistsError,
  CustomAPIError,
  BadRequestError
};
