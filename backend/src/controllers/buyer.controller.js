const Buyer = require('../models/Buyer');
const AppError = require('../utils/AppError');
const escapeRegex = require('../utils/escapeRegex');
const { requireFields, toNumber, str } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');
const { pick, assertOwnerOrAdmin } = require('../utils/helpers');

const EDITABLE = ['name', 'crop', 'location', 'requirementQuantity', 'unit', 'description', 'contactEmail', 'contactPhone', 'isActive'];

/**
 * GET /api/v1/buyers?search=&crop=&location=&page=&limit=   (FindBuyers.jsx)
 * `search` behaves like the frontend filter: matches name OR crop OR location (case-insensitive contains).
 */
exports.getBuyers = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { isActive: true };

  const search = str(req.query.search);
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: rx }, { crop: rx }, { location: rx }];
  }
  const crop = str(req.query.crop);
  if (crop) filter.crop = new RegExp(escapeRegex(crop), 'i');
  const location = str(req.query.location);
  if (location) filter.location = new RegExp(escapeRegex(location), 'i');

  const [data, total] = await Promise.all([
    Buyer.find(filter).sort('name').skip(skip).limit(limit),
    Buyer.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** GET /api/v1/buyers/:id   (BuyerDetails.jsx – replaces router `state`, so a page refresh works) */
exports.getBuyerById = async (req, res) => {
  const buyer = await Buyer.findOne({ _id: req.params.id, isActive: true });
  if (!buyer) throw new AppError('Buyer details not found.', 404);
  res.status(200).json({ success: true, data: buyer });
};

/** POST /api/v1/buyers – Buyer or Admin */
exports.createBuyer = async (req, res) => {
  requireFields(req.body, ['name', 'crop', 'location', 'requirementQuantity']);
  const b = req.body;

  const buyer = await Buyer.create({
    owner: req.user._id,
    name: str(b.name),
    crop: str(b.crop),
    location: str(b.location),
    requirementQuantity: toNumber(b.requirementQuantity, 'requirementQuantity', { min: 1 }),
    unit: b.unit,
    description: b.description,
    contactEmail: b.contactEmail,
    contactPhone: b.contactPhone,
  });
  res.status(201).json({ success: true, data: buyer });
};

/** PATCH /api/v1/buyers/:id – owner or Admin */
exports.updateBuyer = async (req, res) => {
  const buyer = await Buyer.findById(req.params.id);
  if (!buyer) throw new AppError('Buyer not found', 404);
  assertOwnerOrAdmin(buyer.owner, req.user);

  const updates = pick(req.body, EDITABLE);
  if (updates.requirementQuantity !== undefined) {
    updates.requirementQuantity = toNumber(updates.requirementQuantity, 'requirementQuantity', { min: 1 });
  }
  buyer.set(updates);
  await buyer.save();
  res.status(200).json({ success: true, data: buyer });
};

/** DELETE /api/v1/buyers/:id – owner or Admin */
exports.deleteBuyer = async (req, res) => {
  const buyer = await Buyer.findById(req.params.id);
  if (!buyer) throw new AppError('Buyer not found', 404);
  assertOwnerOrAdmin(buyer.owner, req.user);

  await buyer.deleteOne();
  res.status(200).json({ success: true, message: 'Buyer deleted' });
};
