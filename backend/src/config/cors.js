/**
 * FRONTEND_URL may hold several origins separated by commas, e.g.
 *   FRONTEND_URL=http://localhost:5173,https://farmbridge.example.com
 */
const allowedOrigins = () =>
  (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (curl, Postman) which send no Origin header
    if (!origin || allowedOrigins().includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
};

module.exports = corsOptions;
