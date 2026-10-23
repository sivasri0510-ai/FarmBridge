const Inquiry = require('../models/Inquiry');
const Buyer = require('../models/Buyer');
const AppError = require('../utils/AppError');
const { requireFields, str } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');

/** POST /api/v1/buyers/:id/inquiries   body: { message }   (ContactBuyer.jsx – login required) */
exports.createInquiry = async (req, res) => {
  requireFields(req.body, ['message']);
  const buyer = await Buyer.findOne({ _id: req.params.id, isActive: true });
  if (!buyer) throw new AppError('Buyer details not found.', 404);

  const inquiry = await Inquiry.create({ sender: req.user._id, buyer: buyer._id, message: str(req.body.message) });
  res.status(201).json({ success: true, message: 'Message sent successfully.', data: inquiry });
};

/** GET /api/v1/inquiries – messages the logged-in user has sent */
exports.getMyInquiries = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { sender: req.user._id };
  const [data, total] = await Promise.all([
    Inquiry.find(filter).populate('buyer', 'name crop location').sort('-createdAt').skip(skip).limit(limit),
    Inquiry.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** GET /api/v1/inquiries/received – messages sent to buyer profiles the user owns (Buyer role) */
exports.getReceivedInquiries = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const buyerIds = await Buyer.find({ owner: req.user._id }).distinct('_id');
  const filter = { buyer: { $in: buyerIds } };
  const [data, total] = await Promise.all([
    Inquiry.find(filter)
      .populate('sender', 'name email phone role')
      .populate('buyer', 'name crop')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit),
    Inquiry.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};
