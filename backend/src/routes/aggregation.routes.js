const router = require('express').Router();
const c = require('../controllers/aggregation.controller');

router.post('/match', c.findMatches); // SmartAggregation.jsx (public, like the frontend page)

module.exports = router;
