const { requireFields, toNumber, isBlank } = require('../utils/validate');

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * POST /api/v1/net-realization/calculate   (NetRealization.jsx)
 * body: { quantity, sellingPrice, transportCost?, serviceCharges?, otherCosts? }
 * Same formula as the frontend:
 *   grossValue = quantity × sellingPrice;  totalCost = transport + service + other;  net = gross − totalCost
 * The frontend can keep computing this live in the browser; the endpoint exists so the logic has one
 * authoritative implementation (e.g. for mobile clients or saved reports later).
 */
exports.calculate = async (req, res) => {
  requireFields(req.body, ['quantity', 'sellingPrice']);
  const b = req.body;
  const optional = (v, name) => (isBlank(v) ? 0 : toNumber(v, name, { min: 0 }));

  const quantity = toNumber(b.quantity, 'quantity', { min: 0 });
  const sellingPrice = toNumber(b.sellingPrice, 'sellingPrice', { min: 0 });
  const transportCost = optional(b.transportCost, 'transportCost');
  const serviceCharges = optional(b.serviceCharges, 'serviceCharges');
  const otherCosts = optional(b.otherCosts, 'otherCosts');

  const grossValue = round2(quantity * sellingPrice);
  const totalCost = round2(transportCost + serviceCharges + otherCosts);
  const netRealization = round2(grossValue - totalCost);

  res.status(200).json({
    success: true,
    data: { quantity, sellingPrice, transportCost, serviceCharges, otherCosts, grossValue, totalCost, netRealization },
  });
};
