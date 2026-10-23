const mongoose = require('mongoose');

/**
 * FindBuyers.jsx / BuyerDetails.jsx expect: { id, name, crop, location, requirement: '1000 kg' }
 * We store the requirement as number + unit and expose the string through a virtual,
 * so the JSON the frontend receives is unchanged.
 */
const buyerSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Buyer-role user who manages this profile
    name: { type: String, required: [true, 'Buyer name is required'], trim: true, maxlength: 120 },
    crop: { type: String, required: [true, 'Crop is required'], trim: true, maxlength: 60 },
    location: { type: String, required: [true, 'Location is required'], trim: true, maxlength: 100 },
    requirementQuantity: { type: Number, required: [true, 'Requirement quantity is required'], min: 1 },
    unit: { type: String, enum: ['kg', 'quintal', 'tonne'], default: 'kg' },
    description: { type: String, trim: true, maxlength: 1000 },
    // Contact details are only used server-side (never sent in public responses)
    contactEmail: { type: String, trim: true, lowercase: true, select: false },
    contactPhone: { type: String, trim: true, select: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

buyerSchema.virtual('requirement').get(function () {
  return `${this.requirementQuantity} ${this.unit}`;
});

buyerSchema.index({ crop: 1, location: 1 });
buyerSchema.index({ name: 'text', crop: 'text', location: 'text' });

buyerSchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('Buyer', buyerSchema);
