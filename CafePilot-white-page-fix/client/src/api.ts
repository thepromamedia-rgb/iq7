import axios from 'axios';

// In production set VITE_API_URL to the deployed API origin, including /api.
// Same-origin /api is a safe fallback (never call localhost from a visitor's browser).
const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
export const api = axios.create({ baseURL: apiBase, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const money = (amount: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(amount || 0);
