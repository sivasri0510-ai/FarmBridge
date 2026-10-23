const AppError = require('../utils/AppError');

/** Usage: router.get('/:id', validateObjectId(), handler) → 400 instead of a CastError/500. */
const validateObjectId = (param = 'id') => (req, res, next) => {
  if (!/^[0-9a-fA-F]{24}$/.test(req.params[param] || '')) {
    throw new AppError(`Invalid ${param}: '${req.params[param]}'`, 400);
  }
  next();
};

module.exports = validateObjectId;
