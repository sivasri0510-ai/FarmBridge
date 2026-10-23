const AppError = require('../utils/AppError');

const notFound = (req, res, next) =>
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));

// Translate well-known library errors into AppErrors with the right status code
const normalise = (err) => {
  if (err.name === 'ValidationError' && err.errors) {
    const errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    return new AppError('Validation failed', 400, errors);
  }
  if (err.name === 'CastError') return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return new AppError(`A record with that ${field} already exists`, 409);
  }
  if (err.name === 'JsonWebTokenError') return new AppError('Invalid token. Please log in again.', 401);
  if (err.name === 'TokenExpiredError') return new AppError('Session expired. Please log in again.', 401);
  if (err.type === 'entity.parse.failed') return new AppError('Malformed JSON in request body', 400);
  if (err.type === 'entity.too.large') return new AppError('Request body too large', 413);
  if (err.message && err.message.includes('not allowed by CORS')) return new AppError(err.message, 403);
  return err;
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (rawErr, req, res, next) => {
  const err = normalise(rawErr);
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational === true;

  if (!isOperational) console.error('💥 Unexpected error:', rawErr);

  res.status(statusCode).json({
    success: false,
    message: isOperational || process.env.NODE_ENV !== 'production' ? err.message : 'Something went wrong on our side',
    ...(err.errors && { errors: err.errors }),
    ...(process.env.NODE_ENV === 'development' && !isOperational && { stack: rawErr.stack }),
  });
};

module.exports = { notFound, errorHandler };
