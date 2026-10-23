const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const corsOptions = require('./config/cors');
const sanitize = require('./middlewares/sanitize');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.set('trust proxy', 1); // correct client IPs behind Render/Heroku/Nginx (needed for rate limiting)
app.disable('x-powered-by');

app.use(helmet());
app.use(cors(corsOptions));
if (process.env.NODE_ENV !== 'test') app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json({ limit: '10kb' })); // JSON body parsing
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(sanitize);

app.get('/health', (req, res) => res.status(200).json({ success: true, status: 'ok', uptime: process.uptime() }));

app.use('/api/v1', apiLimiter, routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
