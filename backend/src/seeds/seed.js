/**
 * Loads the sample data that is currently hard-coded in the frontend into MongoDB.
 *   npm run seed          → adds data (skips what already exists)
 *   npm run seed:reset    → wipes the collections first (blocked in production)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Produce = require('../models/Produce');
const Buyer = require('../models/Buyer');
const Inquiry = require('../models/Inquiry');
const MarketPrice = require('../models/MarketPrice');
const ServiceProvider = require('../models/ServiceProvider');
const ContactMessage = require('../models/ContactMessage');

const reset = process.argv.includes('--reset');

// ── FindBuyers.jsx ───────────────────────────────────────────
const buyers = [
  { name: 'FreshMart Foods', crop: 'Rice', location: 'Hyderabad', requirementQuantity: 1000 },
  { name: 'Green Basket Traders', crop: 'Tomato', location: 'Vijayawada', requirementQuantity: 500 },
  { name: 'Agro Direct Buyers', crop: 'Maize', location: 'Guntur', requirementQuantity: 2000 },
];

// ── MarketPrices.jsx ─────────────────────────────────────────
const prices = [
  { crop: 'Rice', market: 'Hyderabad', price: 3200 },
  { crop: 'Maize', market: 'Guntur', price: 2400 },
  { crop: 'Tomato', market: 'Vijayawada', price: 1800 },
  { crop: 'Cotton', market: 'Warangal', price: 7200 },
];

// ── Service pages (offerings come from each page's `items` array) ─────────
// Provider names for everything except the 3 collection centres are placeholders.
const providers = [
  { category: 'seeds', name: 'Sample Seeds & Nursery', location: 'Hyderabad', offerings: ['Paddy varieties', 'Vegetable seeds', 'Millet seeds', 'Nursery plants'] },
  { category: 'fertilizers', name: 'Sample Agri Inputs', location: 'Guntur', offerings: ['Fertilizers', 'Organic inputs', 'Crop nutrients', 'Pest-control inputs'] },
  { category: 'irrigation', name: 'Sample Irrigation Services', location: 'Vijayawada', offerings: ['Drip irrigation', 'Sprinkler systems', 'Water pumps', 'Pipes & filters', 'Maintenance'] },
  { category: 'machinery', name: 'Sample Machinery Rentals', location: 'Warangal', offerings: ['Tractors', 'Harvesters', 'Rotavators', 'Seeders', 'Sprayers', 'Threshers', 'Drones'] },
  { category: 'labour', name: 'Sample Farm Labour Group', location: 'Guntur', offerings: ['Sowing workers', 'Harvesting workers', 'Weeding workers', 'General farm labour'] },
  { category: 'logistics', name: 'Sample Farm Logistics', location: 'Hyderabad', offerings: ['Local transport', 'Farm-to-market transport', 'Refrigerated transport', 'Bulk transport'] },
  // CollectionCenter.jsx (real names from the frontend)
  { category: 'collection-centers', name: 'Green Harvest Collection Centre', location: 'Hyderabad', offerings: ['Collection', 'Aggregation'] },
  { category: 'collection-centers', name: 'FarmLink Collection Centre', location: 'Vijayawada', offerings: ['Collection', 'Aggregation'] },
  { category: 'collection-centers', name: 'Rural Produce Centre', location: 'Guntur', offerings: ['Collection', 'Aggregation'] },
  { category: 'pack-houses', name: 'Sample Pack House', location: 'Hyderabad', offerings: ['Cleaning', 'Sorting', 'Grading', 'Packing', 'Storage support'] },
  { category: 'processing', name: 'Sample Processing Unit', location: 'Guntur', offerings: ['Milling', 'Drying', 'Cleaning', 'Value addition', 'Packaging'] },
];

// ── SmartAggregation.jsx demo farmers ────────────────────────
const farmerLots = [
  { name: 'Farmer A', crop: 'Rice', variety: 'Sona Masuri', quantity: 500, quality: 'A', location: 'Guntur', harvestDate: '2026-10-10' },
  { name: 'Farmer B', crop: 'Rice', variety: 'Sona Masuri', quantity: 700, quality: 'A', location: 'Guntur', harvestDate: '2026-10-12' },
  { name: 'Farmer C', crop: 'Maize', variety: 'Hybrid', quantity: 400, quality: 'A', location: 'Hyderabad', harvestDate: '2026-10-11' },
];

const run = async () => {
  if (reset && process.env.NODE_ENV === 'production') {
    console.error('❌ Refusing to --reset in production');
    process.exit(1);
  }
  await connectDB();

  if (reset) {
    await Promise.all([User, Produce, Buyer, Inquiry, MarketPrice, ServiceProvider, ContactMessage].map((m) => m.deleteMany({})));
    console.log('🧹 Collections cleared');
  }

  // Admin
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@farmbridge.local').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) admin = await User.create({ name: 'FarmBridge Admin', email: adminEmail, password: adminPassword, role: 'Admin' });

  // Demo farmers (one per sample lot) + a demo buyer account that owns the sample buyers
  const demoPassword = 'Password123!';
  const farmers = [];
  for (const lot of farmerLots) {
    const email = `${lot.name.toLowerCase().replace(' ', '.')}@farmbridge.local`;
    farmers.push((await User.findOne({ email })) || (await User.create({ name: lot.name, email, password: demoPassword, role: 'Farmer' })));
  }
  const buyerUser =
    (await User.findOne({ email: 'buyer@farmbridge.local' })) ||
    (await User.create({ name: 'Demo Buyer', email: 'buyer@farmbridge.local', password: demoPassword, role: 'Buyer' }));

  if ((await Produce.countDocuments()) === 0) {
    await Produce.insertMany(farmerLots.map((l, i) => ({ farmer: farmers[i]._id, farmerName: l.name, crop: l.crop, variety: l.variety, quantity: l.quantity, quality: l.quality, price: 3000, location: l.location, harvestDate: l.harvestDate })));
  }
  if ((await Buyer.countDocuments()) === 0) await Buyer.insertMany(buyers.map((b) => ({ ...b, owner: buyerUser._id })));
  if ((await MarketPrice.countDocuments()) === 0) await MarketPrice.insertMany(prices);
  if ((await ServiceProvider.countDocuments()) === 0) await ServiceProvider.insertMany(providers.map((p) => ({ ...p, owner: admin._id })));

  console.log('\n🌱 Seed complete');
  console.log(`   Admin  → ${adminEmail} / ${adminPassword}`);
  console.log(`   Farmers→ farmer.a@farmbridge.local, farmer.b@…, farmer.c@…  / ${demoPassword}`);
  console.log(`   Buyer  → buyer@farmbridge.local / ${demoPassword}`);
  console.log('   ⚠️  Demo credentials – do not seed these into a production database.\n');

  await mongoose.connection.close();
};

run().catch(async (err) => {
  console.error('❌ Seed failed:', err);
  await mongoose.connection.close();
  process.exit(1);
});
