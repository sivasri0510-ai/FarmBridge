const router = require('express').Router();
const c = require('../controllers/service.controller');
const { protect, authorize } = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', c.getCategories); //                                          Services.jsx
router.get('/:category', c.getProviders); //                                  Seeds.jsx … Processing.jsx
router.post('/:category', protect, authorize('Service Provider'), c.createProvider);

router
  .route('/:category/:id')
  .get(validateObjectId(), c.getProviderById) //                              CollectionCenter "View Details"
  .patch(protect, validateObjectId(), c.updateProvider)
  .put(protect, validateObjectId(), c.updateProvider)
  .delete(protect, validateObjectId(), c.deleteProvider);

module.exports = router;
