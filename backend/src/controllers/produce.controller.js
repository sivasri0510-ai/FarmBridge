const Produce = require('../models/Produce');
const AppError = require('../utils/AppError');
const escapeRegex = require('../utils/escapeRegex');
const { requireFields, toNumber, str } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');
const { pick, assertOwnerOrAdmin } = require('../utils/helpers');

const EDITABLE = ['farmerName', 'crop', 'variety', 'quantity', 'unit', 'quality', 'price', 'location', 'harvestDate', 'status'];

const parseDate = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new AppError("'harvestDate' must be a valid date (YYYY-MM-DD)", 400);
  return d;
};

/** POST /api/v1/produce  (SellProduce.jsx submit) – Farmer only */
exports.createProduce = async (req, res) => {
  requireFields(req.body, ['crop', 'quantity', 'quality', 'price', 'location']);
  const b = req.body;

  const produce = await Produce.create({
    farmer: req.user._id,
    farmerName: str(b.farmerName) || req.user.name,
    crop: str(b.crop),
    variety: str(b.variety),
    quantity: toNumber(b.quantity, 'quantity', { min: 1 }),
    unit: b.unit,
    quality: str(b.quality),
    price: toNumber(b.price, 'price', { min: 0 }),
    location: str(b.location),
    harvestDate: parseDate(b.harvestDate),
  });

  res.status(201).json({ success: true, message: 'Produce details submitted successfully.', data: produce });
};

/** GET /api/v1/produce?crop=&variety=&quality=&location=&page=&limit=  – public browse of available lots */
exports.getAllProduce = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { status: 'available' };
  for (const key of ['crop', 'variety', 'quality', 'location']) {
    const v = str(req.query[key]);
    if (v) filter[key] = new RegExp(escapeRegex(v), 'i');
  }

  const [data, total] = await Promise.all([
    Produce.find(filter).select('-farmer').sort('-createdAt').skip(skip).limit(limit),
    Produce.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** GET /api/v1/produce/mine – the logged-in farmer's own listings (all statuses) */
exports.getMyProduce = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const filter = { farmer: req.user._id };
  const [data, total] = await Promise.all([
    Produce.find(filter).sort('-createdAt').skip(skip).limit(limit),
    Produce.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** GET /api/v1/produce/:id */
exports.getProduceById = async (req, res) => {
  const produce = await Produce.findById(req.params.id).select('-farmer');
  if (!produce || produce.status === 'withdrawn') throw new AppError('Produce listing not found', 404);
  res.status(200).json({ success: true, data: produce });
};

/** PATCH /api/v1/produce/:id – owner or Admin */
exports.updateProduce = async (req, res) => {
  const produce = await Produce.findById(req.params.id);
  if (!produce) throw new AppError('Produce listing not found', 404);
  assertOwnerOrAdmin(produce.farmer, req.user);

  const updates = pick(req.body, EDITABLE);
  if (updates.quantity !== undefined) updates.quantity = toNumber(updates.quantity, 'quantity', { min: 1 });
  if (updates.price !== undefined) updates.price = toNumber(updates.price, 'price', { min: 0 });
  if (updates.harvestDate !== undefined) updates.harvestDate = parseDate(updates.harvestDate);

  produce.set(updates);
  await produce.save(); // runs schema validators
  res.status(200).json({ success: true, data: produce });
};

/** DELETE /api/v1/produce/:id – owner or Admin */
exports.deleteProduce = async (req, res) => {
  const produce = await Produce.findById(req.params.id);
  if (!produce) throw new AppError('Produce listing not found', 404);
  assertOwnerOrAdmin(produce.farmer, req.user);

  await produce.deleteOne();
  res.status(200).json({ success: true, message: 'Produce listing deleted' });
};
