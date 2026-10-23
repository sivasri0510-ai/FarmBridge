const mongoose = require('mongoose');

/** Contact.jsx → name, email, message (the form currently has no state – these are its three fields). */
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    message: { type: String, required: [true, 'Message is required'], trim: true, maxlength: 3000 },
    status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

contactMessageSchema.set('toJSON', { virtuals: true, versionKey: false });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
