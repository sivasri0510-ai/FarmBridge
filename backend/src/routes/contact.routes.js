const router = require('express').Router();
const c = require('../controllers/contact.controller');
const { protect, authorize } = require('../middlewares/auth');
const { formLimiter } = require('../middlewares/rateLimiter');

router.post('/', formLimiter, c.submitContact); // Contact.jsx
router.get('/', protect, authorize(), c.getMessages); // Admin only

module.exports = router;
