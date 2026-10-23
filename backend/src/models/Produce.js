const mongoose = require('mongoose');

/**
 * Created by SellProduce.jsx  → { farmerName, crop, quantity, quality, price, location }
 * Read by SmartAggregation.jsx → also needs { variety, harvestDate } (optional on SellProduce).
 */
const produceSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    farmerName: { type: String, required: [true, 'Farmer name is required'], trim: true, maxlength: 100 },
    crop: { type: String, required: [true, 'Crop is required'], trim: true, maxlength: 60 },
    variety: { type: String, trim: true, default: '', maxlength: 60 },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] }, // kg
    unit: { type: String, enum: ['kg', 'quintal', 'tonne'], default: 'kg' },
    quality: { type: String, required: [true, 'Quality / grade is required'], trim: true, maxlength: 30 },
    price: { type: Number, required: [true, 'Expected price is required'], min: [0, 'Price cannot be negative'] }, // ₹ per unit
    location: { type: String, required: [true, 'Location is required'], trim: true, maxlength: 100 },
    harvestDate: { type: Date },
    status: { type: String, enum: ['available', 'sold', 'withdrawn'], default: 'available', index: true },
  },
  { timestamps: true }
);

// Supports the aggregation match (crop + variety + quality + location, all case-insensitive)
produceSchema.index({ crop: 1, variety: 1, quality: 1, location: 1, status: 1 });

produceSchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('Produce', produceSchema);
