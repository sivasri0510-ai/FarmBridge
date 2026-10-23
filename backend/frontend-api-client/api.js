/**
 * Drop-in API layer for the FarmBridge React frontend  →  copy to  src/api.js
 * No extra dependency (uses fetch). Add to the frontend's .env:   VITE_API_URL=http://localhost:5000/api/v1
 *
 * Replaces the localStorage / hard-coded data used today in Login, Register, SellProduce,
 * FindBuyers, BuyerDetails, ContactBuyer, SmartAggregation, MarketPrices, NetRealization, Contact
 * and the service pages.
 */
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'
const TOKEN_KEY = 'farmbridgeToken'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
export const isLoggedIn = () => Boolean(getToken())

async function request(path, { method = 'GET', body, params } = {}) {
  const qs = params ? '?' + new URLSearchParams(Object.entries(params).filter(([, v]) => v !== '' && v != null)) : ''
  const res = await fetch(`${BASE}${path}${qs}`, {
    method,
    headers: {
      ...(body && { 'Content-Type': 'application/json' }),
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 401) clearToken() // expired / invalid session
    const err = new Error(json.message || `Request failed (${res.status})`)
    err.status = res.status
    err.errors = json.errors
    throw err
  }
  return json
}

// ── Auth (Login.jsx / Register.jsx) ─────────────────────────
export const register = async (form) => {
  const json = await request('/auth/register', { method: 'POST', body: form }) // { name, email, password, role }
  setToken(json.token)
  return json.data
}
export const login = async ({ email, password }) => {
  const json = await request('/auth/login', { method: 'POST', body: { email, password } })
  setToken(json.token)
  return json.data
}
export const getMe = () => request('/auth/me').then((j) => j.data)
export const logout = () => clearToken()

// ── Produce (SellProduce.jsx) ───────────────────────────────
export const submitProduce = (form) => request('/produce', { method: 'POST', body: form }) // { farmerName, crop, quantity, quality, price, location }
export const getMyProduce = () => request('/produce/mine')

// ── Buyers (FindBuyers / BuyerDetails / ContactBuyer) ───────
export const getBuyers = (search = '') => request('/buyers', { params: { search } }).then((j) => j.data)
export const getBuyer = (id) => request(`/buyers/${id}`).then((j) => j.data) // BuyerDetails: use useParams() instead of router state
export const contactBuyer = (id, message) => request(`/buyers/${id}/inquiries`, { method: 'POST', body: { message } })

// ── Aggregation (SmartAggregation.jsx) ──────────────────────
export const findMatches = (form) => request('/aggregation/match', { method: 'POST', body: form }).then((j) => j.data) // { matches, totalQuantity, ... }

// ── Market prices / Net realization / Contact ──────────────
export const getMarketPrices = (crop = '', market = '') => request('/market-prices', { params: { crop, market } }).then((j) => j.data)
export const calculateNet = (v) => request('/net-realization/calculate', { method: 'POST', body: v }).then((j) => j.data)
export const sendContact = (form) => request('/contact', { method: 'POST', body: form }) // { name, email, message }

// ── Services (Services.jsx + Seeds.jsx … Processing.jsx) ───
export const getServiceCategories = () => request('/services').then((j) => j.data)
export const getProviders = (category, params) => request(`/services/${category}`, { params }).then((j) => j.data)
