const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Matches the <select> on Register.jsx. 'Admin' is never self-assignable (see auth.controller).
const PUBLIC_ROLES = ['Farmer', 'Buyer', 'Service Provider'];
const ROLES = [...PUBLIC_ROLES, 'Admin'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned by default
    },
    role: { type: String, enum: { values: ROLES, message: '{VALUE} is not a valid role' }, default: 'Farmer' },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
module.exports.PUBLIC_ROLES = PUBLIC_ROLES;
module.exports.ROLES = ROLES;
