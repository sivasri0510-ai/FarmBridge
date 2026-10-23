const router = require('express').Router();
const c = require('../controllers/marketPrice.controller');
const { protect, authorize } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', c.getMarketPrices); // MarketPrices.jsx
router.post('/', protect, authorize(), c.createMarketPrice); // authorize() with no roles → Admin only
router
  .route('/:id')
  .patch(protect, authorize(), validateObjectId(), c.updateMarketPrice)
  .put(protect, authorize(), validateObjectId(), c.updateMarketPrice)
  .delete(protect, authorize(), validateObjectId(), c.deleteMarketPrice);

module.exports = router;
