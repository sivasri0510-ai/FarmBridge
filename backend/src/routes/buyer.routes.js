const router = require('express').Router();
const c = require('../controllers/buyer.controller');
const inquiry = require('../controllers/inquiry.controller');
const { protect, authorize } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', c.getBuyers); //                                            FindBuyers.jsx
router.post('/', protect, authorize('Buyer'), c.createBuyer);

router
  .route('/:id')
  .get(validateObjectId(), c.getBuyerById) //                                 BuyerDetails.jsx
  .patch(protect, validateObjectId(), c.updateBuyer)
  .put(protect, validateObjectId(), c.updateBuyer)
  .delete(protect, validateObjectId(), c.deleteBuyer);

router.post('/:id/inquiries', protect, validateObjectId(), inquiry.createInquiry); // ContactBuyer.jsx

module.exports = router;
