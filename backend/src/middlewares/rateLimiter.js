const rateLimit = require('express-rate-limit');

const make = (windowMs, limit, message) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message },
  });

// Whole API: 300 requests / 15 min / IP
const apiLimiter = make(15 * 60 * 1000, 300, 'Too many requests, please try again later.');
// Login / register: 20 attempts / 15 min / IP (brute-force protection)
const authLimiter = make(15 * 60 * 1000, 20, 'Too many login attempts, please try again in 15 minutes.');
// Public forms (contact): 10 / hour / IP (spam protection)
const formLimiter = make(60 * 60 * 1000, 10, 'Too many submissions, please try again later.');

module.exports = { apiLimiter, authLimiter, formLimiter };
