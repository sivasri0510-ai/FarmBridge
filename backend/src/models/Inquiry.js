const mongoose = require('mongoose');

/** ContactBuyer.jsx → { message } (buyer comes from the URL, sender from the JWT). */
const inquirySchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true, index: true },
    message: { type: String, required: [true, 'Message is required'], trim: true, minlength: 1, maxlength: 2000 },
    status: { type: String, enum: ['sent', 'read', 'replied'], default: 'sent' },
  },
  { timestamps: true }
);

inquirySchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('Inquiry', inquirySchema);
