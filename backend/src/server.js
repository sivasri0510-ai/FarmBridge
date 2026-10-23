require('dotenv').config(); // must run before anything reads process.env

const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Fail fast on missing configuration
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
  console.error('❌ JWT_SECRET is missing or too short (min 16 chars). Set it in .env');
  process.exit(1);
}

let server;

const start = async () => {
  await connectDB();
  server = app.listen(PORT, () => {
    console.log(`🚀 FarmBridge API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`   CORS allowed origin(s): ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  });
};

const shutdown = async (signal) => {
  console.log(`\n${signal} received – shutting down gracefully`);
  if (server) server.close(async () => { await disconnectDB(); process.exit(0); });
  else process.exit(0);
  setTimeout(() => process.exit(1), 10000).unref(); // force-exit if connections hang
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled rejection:', err);
  shutdown('unhandledRejection');
});

start();
