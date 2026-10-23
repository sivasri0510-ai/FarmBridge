const mongoose = require('mongoose');

/** MarketPrices.jsx → { crop, market, price } */
const marketPriceSchema = new mongoose.Schema(
  {
    crop: { type: String, required: [true, 'Crop is required'], trim: true, maxlength: 60 },
    market: { type: String, required: [true, 'Market is required'], trim: true, maxlength: 100 },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] }, // ₹
    unit: { type: String, trim: true, default: 'quintal' },
    priceDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

marketPriceSchema.index({ crop: 1, market: 1, priceDate: -1 });

marketPriceSchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
