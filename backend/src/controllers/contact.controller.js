const ContactMessage = require('../models/ContactMessage');
const AppError = require('../utils/AppError');
const { requireFields, str, isEmail } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');

/** POST /api/v1/contact   body: { name, email, message }   (Contact.jsx) */
exports.submitContact = async (req, res) => {
  requireFields(req.body, ['name', 'email', 'message']);
  if (!isEmail(req.body.email)) throw new AppError('Please provide a valid email', 400, [{ field: 'email', message: 'invalid email' }]);

  await ContactMessage.create({ name: str(req.body.name), email: str(req.body.email), message: str(req.body.message) });
  res.status(201).json({ success: true, message: 'Your message was submitted successfully.' });
};

/** GET /api/v1/contact – Admin inbox */
exports.getMessages = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const [data, total] = await Promise.all([
    ContactMessage.find().sort('-createdAt').skip(skip).limit(limit),
    ContactMessage.countDocuments(),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};
