process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_test_secret';
process.env.FRONTEND_URL = 'http://localhost:5173';

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

// These tests exercise everything that is decided BEFORE a database query
// (routing, validation, auth gates, CORS, pure calculations), so they run without MongoDB.

describe('platform', () => {
  test('GET /health → 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('unknown route → 404 JSON', async () => {
    const res = await request(app).get('/api/v1/nope');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test('malformed JSON → 400', async () => {
    const res = await request(app).post('/api/v1/auth/login').set('Content-Type', 'application/json').send('{bad');
    expect(res.status).toBe(400);
  });

  test('CORS allows the frontend origin and blocks others', async () => {
    const ok = await request(app).get('/health').set('Origin', 'http://localhost:5173');
    expect(ok.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    const bad = await request(app).get('/api/v1/services').set('Origin', 'http://evil.example');
    expect(bad.status).toBe(403);
  });
});

describe('auth validation', () => {
  test('register without fields → 400 listing them', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/name, email, password/);
  });
  test('register with short password → 400', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({ name: 'A', email: 'a@b.co', password: '123' });
    expect(res.status).toBe(400);
  });
  test('register cannot self-assign Admin → 400', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({ name: 'A', email: 'a@b.co', password: '12345678', role: 'Admin' });
    expect(res.status).toBe(400);
  });
  test('login with NoSQL operator object → rejected, not a crash', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({ email: { $gt: '' }, password: { $gt: '' } });
    expect([400, 401]).toContain(res.status);
  });
});

describe('protected routes', () => {
  test('no token → 401', async () => {
    expect((await request(app).post('/api/v1/produce').send({})).status).toBe(401);
    expect((await request(app).post('/api/v1/buyers/507f1f77bcf86cd799439011/inquiries').send({})).status).toBe(401);
    expect((await request(app).get('/api/v1/auth/me')).status).toBe(401);
  });
  test('garbage token → 401', async () => {
    const res = await request(app).get('/api/v1/inquiries').set('Authorization', 'Bearer abc.def.ghi');
    expect(res.status).toBe(401);
  });
  test('expired token → 401', async () => {
    const t = jwt.sign({ id: '507f1f77bcf86cd799439011' }, process.env.JWT_SECRET, { expiresIn: -10 });
    const res = await request(app).get('/api/v1/auth/me').set('Authorization', `Bearer ${t}`);
    expect(res.status).toBe(401);
  });
});

describe('param & input validation', () => {
  test('invalid ObjectId → 400', async () => {
    expect((await request(app).get('/api/v1/buyers/not-an-id')).status).toBe(400);
    expect((await request(app).get('/api/v1/produce/123')).status).toBe(400);
  });
  test('unknown service category → 404', async () => {
    expect((await request(app).get('/api/v1/services/spaceships')).status).toBe(404);
  });
  test('aggregation requires crop/variety/quality/location', async () => {
    const res = await request(app).post('/api/v1/aggregation/match').send({ crop: 'Rice' });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/variety, quality, location/);
  });
  test('contact validates email and required fields', async () => {
    expect((await request(app).post('/api/v1/contact').send({})).status).toBe(400);
    expect((await request(app).post('/api/v1/contact').send({ name: 'x', email: 'bad', message: 'hi' })).status).toBe(400);
  });
});

describe('net realization (same maths as NetRealization.jsx)', () => {
  test('computes gross, costs and net', async () => {
    const res = await request(app)
      .post('/api/v1/net-realization/calculate')
      .send({ quantity: 1000, sellingPrice: 32, transportCost: 2000, serviceCharges: 500, otherCosts: 250 });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ grossValue: 32000, totalCost: 2750, netRealization: 29250 });
  });
  test('optional costs default to 0; strings from the form are accepted', async () => {
    const res = await request(app).post('/api/v1/net-realization/calculate').send({ quantity: '10', sellingPrice: '5' });
    expect(res.body.data.netRealization).toBe(50);
  });
  test('negative / missing values → 400', async () => {
    expect((await request(app).post('/api/v1/net-realization/calculate').send({ quantity: -1, sellingPrice: 5 })).status).toBe(400);
    expect((await request(app).post('/api/v1/net-realization/calculate').send({})).status).toBe(400);
  });
});
