const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/produce', require('./produce.routes'));
router.use('/buyers', require('./buyer.routes'));
router.use('/inquiries', require('./inquiry.routes'));
router.use('/aggregation', require('./aggregation.routes'));
router.use('/market-prices', require('./marketPrice.routes'));
router.use('/net-realization', require('./netRealization.routes'));
router.use('/services', require('./service.routes'));
router.use('/contact', require('./contact.routes'));

module.exports = router;
