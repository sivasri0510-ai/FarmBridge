const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

/** Requires "Authorization: Bearer <token>" and attaches req.user. */
const protect = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  if (!token) throw new AppError('You are not logged in. Please log in to continue.', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // bad/expired token → 401 via errorHandler
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new AppError('The account for this token no longer exists.', 401);

  req.user = user;
  next();
};

/** Role gate – use after protect(). Admin always passes. */
const authorize = (...roles) => (req, res, next) => {
  if (req.user.role === 'Admin' || roles.includes(req.user.role)) return next();
  throw new AppError(`Role '${req.user.role}' is not permitted to perform this action.`, 403);
};

module.exports = { protect, authorize };
