const AppError = require('./AppError');

/** Copy only whitelisted keys that are present on the object (mass-assignment protection). */
const pick = (obj = {}, keys) =>
  keys.reduce((acc, k) => (obj[k] !== undefined ? { ...acc, [k]: obj[k] } : acc), {});

/** 403 unless the user owns the resource or is an Admin. */
const assertOwnerOrAdmin = (ownerId, user) => {
  if (user.role === 'Admin') return;
  if (!ownerId || String(ownerId) !== String(user._id)) {
    throw new AppError('You do not have permission to modify this resource.', 403);
  }
};

module.exports = { pick, assertOwnerOrAdmin };
