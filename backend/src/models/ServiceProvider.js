const mongoose = require('mongoose');

// URL slugs = the frontend routes /seeds, /fertilizers, … /collection-centers, /pack-houses, /processing
const CATEGORIES = [
  'seeds',
  'fertilizers',
  'irrigation',
  'machinery',
  'labour',
  'logistics',
  'collection-centers',
  'pack-houses',
  'processing',
];

const serviceProviderSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: [true, 'Provider name is required'], trim: true, maxlength: 120 },
    category: { type: String, required: [true, 'Category is required'], enum: { values: CATEGORIES, message: '{VALUE} is not a valid category' }, index: true },
    location: { type: String, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 1000 },
    offerings: [{ type: String, trim: true, maxlength: 80 }], // e.g. ['Drip irrigation', 'Water pumps']
    contactPhone: { type: String, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceProviderSchema.index({ category: 1, location: 1 });

serviceProviderSchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
module.exports.CATEGORIES = CATEGORIES;
