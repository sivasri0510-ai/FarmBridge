/**
 * Minimal NoSQL-injection guard for Express 5 (express-mongo-sanitize is not
 * compatible because req.query is read-only there).
 * Strips keys that start with "$" or contain "." from req.body, recursively.
 * Query-string values are coerced to strings inside controllers via utils/validate.js → str().
 */
const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([k]) => !k.startsWith('$') && !k.includes('.'))
        .map(([k, v]) => [k, clean(v)])
    );
  }
  return value;
};

module.exports = (req, res, next) => {
  if (req.body) req.body = clean(req.body);
  next();
};
