const Produce = require('../models/Produce');
const { requireFields, toNumber, str, isBlank } = require('../utils/validate');

/**
 * POST /api/v1/aggregation/match   (SmartAggregation.jsx "Find Matching Produce")
 * body: { crop, variety, quality, location, quantity?, harvestDate? }
 *
 * Same rule as the frontend: crop, variety, quality and location must match exactly,
 * ignoring case (collation strength 2 = case-insensitive equality).
 */
exports.findMatches = async (req, res) => {
  requireFields(req.body, ['crop', 'variety', 'quality', 'location']);
  const b = req.body;
  const yourQuantity = isBlank(b.quantity) ? 0 : toNumber(b.quantity, 'quantity', { min: 0 });

  const lots = await Produce.find({
    status: 'available',
    crop: str(b.crop),
    variety: str(b.variety),
    quality: str(b.quality),
    location: str(b.location),
  })
    .collation({ locale: 'en', strength: 2 })
    .sort('harvestDate')
    .limit(100)
    .lean();

  // Shape matches what SmartAggregation.jsx renders: { id, name, crop, variety, quantity, quality, location }
  // Farmer contact details are deliberately NOT exposed here.
  const matches = lots.map((p) => ({
    id: p._id,
    name: p.farmerName,
    crop: p.crop,
    variety: p.variety,
    quantity: p.quantity,
    unit: p.unit,
    quality: p.quality,
    location: p.location,
    harvestDate: p.harvestDate,
  }));

  const totalQuantity = matches.reduce((sum, m) => sum + m.quantity, 0);

  res.status(200).json({
    success: true,
    data: {
      matches,
      totalQuantity, // "Total matching quantity" banner
      yourQuantity,
      combinedQuantity: totalQuantity + yourQuantity, // size of the lot if the user joins in
    },
  });
};
