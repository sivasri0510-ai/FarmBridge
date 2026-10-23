const MarketPrice = require('../models/MarketPrice');
const AppError = require('../utils/AppError');
const escapeRegex = require('../utils/escapeRegex');
const { requireFields, toNumber, str } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');
const { pick } = require('../utils/helpers');

/** GET /api/v1/market-prices?crop=&market=   (MarketPrices.jsx – both filters are "contains", case-insensitive) */
exports.getMarketPrices = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query, { defaultLimit: 50 });
  const filter = {};
  const crop = str(req.query.crop);
  const market = str(req.query.market ?? req.query.location); // frontend labels the 2nd box "Market / Location"
  if (crop) filter.crop = new RegExp(escapeRegex(crop), 'i');
  if (market) filter.market = new RegExp(escapeRegex(market), 'i');

  const [data, total] = await Promise.all([
    MarketPrice.find(filter).sort({ crop: 1, market: 1 }).skip(skip).limit(limit),
    MarketPrice.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** POST /api/v1/market-prices – Admin only */
exports.createMarketPrice = async (req, res) => {
  requireFields(req.body, ['crop', 'market', 'price']);
  const price = await MarketPrice.create({
    crop: str(req.body.crop),
    market: str(req.body.market),
    price: toNumber(req.body.price, 'price', { min: 0 }),
    unit: req.body.unit,
    priceDate: req.body.priceDate,
  });
  res.status(201).json({ success: true, data: price });
};

/** PATCH /api/v1/market-prices/:id – Admin only */
exports.updateMarketPrice = async (req, res) => {
  const updates = pick(req.body, ['crop', 'market', 'price', 'unit', 'priceDate']);
  if (updates.price !== undefined) updates.price = toNumber(updates.price, 'price', { min: 0 });

  const price = await MarketPrice.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!price) throw new AppError('Market price not found', 404);
  res.status(200).json({ success: true, data: price });
};

/** DELETE /api/v1/market-prices/:id – Admin only */
exports.deleteMarketPrice = async (req, res) => {
  const price = await MarketPrice.findByIdAndDelete(req.params.id);
  if (!price) throw new AppError('Market price not found', 404);
  res.status(200).json({ success: true, message: 'Market price deleted' });
};
