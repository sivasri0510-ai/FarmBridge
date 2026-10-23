const mongoose = require('mongoose');

/**
 * Connection event logging – registered once, before connecting,
 * so events that happen after the initial connect are logged too
 * (e.g. an Atlas network blip).
 */
mongoose.connection.on('connected', () =>
  console.log(`✅ MongoDB connected → ${mongoose.connection.host}/${mongoose.connection.name}`)
);
mongoose.connection.on('error', (err) =>
  console.error(`❌ MongoDB connection error: ${err.message}`)
);
mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('🔄 MongoDB reconnected'));

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI is not defined. Copy .env.example to .env and set it.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // fail fast if the DB is unreachable
      maxPoolSize: 10,
    });
  } catch (err) {
    console.error(`❌ Initial MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close(false);
  console.log('🛑 MongoDB connection closed');
};

module.exports = { connectDB, disconnectDB };
