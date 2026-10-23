const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { requireFields, str, isEmail } = require('../utils/validate');

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const sendAuth = (res, status, user) =>
  res.status(status).json({ success: true, token: signToken(user), data: user });

/** POST /api/v1/auth/register   body: { name, email, password, role? }  (Register.jsx) */
exports.register = async (req, res) => {
  requireFields(req.body, ['name', 'email', 'password']);
  const { name, email, password, phone } = req.body;
  const role = req.body.role || 'Farmer';

  if (typeof password !== 'string' || password.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400, [{ field: 'password', message: 'min 8 characters' }]);
  }
  if (!isEmail(email)) throw new AppError('Please provide a valid email', 400, [{ field: 'email', message: 'invalid email' }]);
  if (!User.PUBLIC_ROLES.includes(role)) {
    throw new AppError(`Role must be one of: ${User.PUBLIC_ROLES.join(', ')}`, 400, [{ field: 'role', message: 'invalid role' }]);
  }

  if (await User.exists({ email: str(email).toLowerCase() })) {
    throw new AppError('An account with that email already exists', 409);
  }

  const user = await User.create({ name: str(name), email: str(email), password, role, phone });
  sendAuth(res, 201, user);
};

/** POST /api/v1/auth/login   body: { email, password }  (Login.jsx) */
exports.login = async (req, res) => {
  requireFields(req.body, ['email', 'password']);
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') throw new AppError('Invalid credentials', 401);

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  // Same message for unknown email and wrong password → no account enumeration
  if (!user || !user.isActive || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }
  sendAuth(res, 200, user);
};

/** GET /api/v1/auth/me  – lets the frontend restore the session on refresh. */
exports.getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

/** POST /api/v1/auth/logout – JWTs are stateless; the client discards the token. */
exports.logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out. Please discard the token on the client.' });
};
