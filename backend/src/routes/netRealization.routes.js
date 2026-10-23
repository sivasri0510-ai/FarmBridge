const router = require('express').Router();
const c = require('../controllers/netRealization.controller');

router.post('/calculate', c.calculate); // NetRealization.jsx

module.exports = router;
