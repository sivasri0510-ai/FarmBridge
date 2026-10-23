const AppError = require('./AppError');

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

/** Throws 400 listing every missing/blank field. */
const requireFields = (source, fields) => {
  const missing = fields.filter((f) => isBlank(source?.[f]));
  if (missing.length) {
    throw new AppError(
      `Missing required field(s): ${missing.join(', ')}`,
      400,
      missing.map((f) => ({ field: f, message: 'is required' }))
    );
  }
};

/** Throws 400 unless value is a finite number >= min. Returns the Number. */
const toNumber = (value, field, { min = 0 } = {}) => {
  const n = Number(value);
  if (isBlank(value) || !Number.isFinite(n) || n < min) {
    throw new AppError(`'${field}' must be a number greater than or equal to ${min}`, 400, [
      { field, message: `must be a number >= ${min}` },
    ]);
  }
  return n;
};

/** Query-string values can be arrays/objects (?crop[$ne]=x) – always coerce to a trimmed string. */
const str = (v) => (v === undefined || v === null ? '' : String(v).trim());

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmail = (v) => EMAIL_RE.test(str(v));

module.exports = { requireFields, toNumber, str, isEmail, isBlank };
