const router = require('express').Router();
const c = require('../controllers/inquiry.controller');
const { protect, authorize } = require('../middlewares/auth');

router.use(protect);
router.get('/', c.getMyInquiries);
router.get('/received', authorize('Buyer'), c.getReceivedInquiries);

module.exports = router;
