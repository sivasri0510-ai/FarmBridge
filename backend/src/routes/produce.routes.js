const router = require('express').Router();
const c = require('../controllers/produce.controller');
const { protect, authorize } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', c.getAllProduce);
router.post('/', protect, authorize('Farmer'), c.createProduce); //   SellProduce.jsx
router.get('/mine', protect, authorize('Farmer'), c.getMyProduce); // must be declared before '/:id'

router
  .route('/:id')
  .get(validateObjectId(), c.getProduceById)
  .patch(protect, validateObjectId(), c.updateProduce)
  .put(protect, validateObjectId(), c.updateProduce)
  .delete(protect, validateObjectId(), c.deleteProduce);

module.exports = router;
