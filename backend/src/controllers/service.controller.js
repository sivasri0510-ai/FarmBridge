const ServiceProvider = require('../models/ServiceProvider');
const AppError = require('../utils/AppError');
const escapeRegex = require('../utils/escapeRegex');
const { requireFields, str } = require('../utils/validate');
const { getPagination, paginatedResponse } = require('../utils/pagination');
const { pick, assertOwnerOrAdmin } = require('../utils/helpers');

const { CATEGORIES } = ServiceProvider;

// Titles/paths mirror Services.jsx
const TITLES = {
  seeds: 'Seeds & Nurseries',
  fertilizers: 'Fertilizers & Inputs',
  irrigation: 'Irrigation',
  machinery: 'Machinery Rental',
  labour: 'Labour',
  logistics: 'Logistics',
  'collection-centers': 'Collection Centres',
  'pack-houses': 'Pack Houses',
  processing: 'Processing',
};

const EDITABLE = ['name', 'location', 'description', 'offerings', 'contactPhone', 'contactEmail', 'isActive'];

const assertCategory = (category) => {
  if (!CATEGORIES.includes(category)) {
    throw new AppError(`Unknown service category '${category}'. Valid: ${CATEGORIES.join(', ')}`, 404);
  }
};

/** GET /api/v1/services – the nine cards on Services.jsx, with provider counts */
exports.getCategories = async (req, res) => {
  const counts = await ServiceProvider.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);
  const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));

  const data = CATEGORIES.map((slug) => ({
    slug,
    title: TITLES[slug],
    path: `/${slug}`, // frontend route
    providerCount: countMap[slug] || 0,
  }));
  res.status(200).json({ success: true, count: data.length, data });
};

/** GET /api/v1/services/:category?search=&location=  (Seeds.jsx … Processing.jsx, CollectionCenter.jsx) */
exports.getProviders = async (req, res) => {
  const { category } = req.params;
  assertCategory(category);
  const { page, limit, skip } = getPagination(req.query);

  const filter = { category, isActive: true };
  const location = str(req.query.location);
  if (location) filter.location = new RegExp(escapeRegex(location), 'i');
  const search = str(req.query.search);
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: rx }, { offerings: rx }, { description: rx }];
  }

  const [data, total] = await Promise.all([
    ServiceProvider.find(filter).sort('name').skip(skip).limit(limit),
    ServiceProvider.countDocuments(filter),
  ]);
  paginatedResponse(res, { data, total, page, limit });
};

/** GET /api/v1/services/:category/:id  (CollectionCenter "View Details") */
exports.getProviderById = async (req, res) => {
  assertCategory(req.params.category);
  const provider = await ServiceProvider.findOne({ _id: req.params.id, category: req.params.category, isActive: true });
  if (!provider) throw new AppError('Service provider not found', 404);
  res.status(200).json({ success: true, data: provider });
};

/** POST /api/v1/services/:category – Service Provider or Admin */
exports.createProvider = async (req, res) => {
  assertCategory(req.params.category);
  requireFields(req.body, ['name']);
  const provider = await ServiceProvider.create({
    ...pick(req.body, EDITABLE),
    name: str(req.body.name),
    category: req.params.category,
    owner: req.user._id,
  });
  res.status(201).json({ success: true, data: provider });
};

/** PATCH /api/v1/services/:category/:id – owner or Admin */
exports.updateProvider = async (req, res) => {
  assertCategory(req.params.category);
  const provider = await ServiceProvider.findOne({ _id: req.params.id, category: req.params.category });
  if (!provider) throw new AppError('Service provider not found', 404);
  assertOwnerOrAdmin(provider.owner, req.user);

  provider.set(pick(req.body, EDITABLE));
  await provider.save();
  res.status(200).json({ success: true, data: provider });
};

/** DELETE /api/v1/services/:category/:id – owner or Admin */
exports.deleteProvider = async (req, res) => {
  assertCategory(req.params.category);
  const provider = await ServiceProvider.findOne({ _id: req.params.id, category: req.params.category });
  if (!provider) throw new AppError('Service provider not found', 404);
  assertOwnerOrAdmin(provider.owner, req.user);

  await provider.deleteOne();
  res.status(200).json({ success: true, message: 'Service provider deleted' });
};
