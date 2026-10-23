const router = require('express').Router();
const c = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register', authLimiter, c.register); // Register.jsx
router.post('/login', authLimiter, c.login); //       Login.jsx
router.get('/me', protect, c.getMe);
router.post('/logout', protect, c.logout);

module.exports = router;
