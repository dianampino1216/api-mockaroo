// Reads API_KEY from env. If unset, the API is open (useful for local dev).
const API_KEY = process.env.API_KEY;

const ALLOWED_ORIGINS = [
  'http://127.0.0.1:5173',
  'https://prueba-tecnica-javeriana.vercel.app',
];

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Api-Key'
  );
}

function isAuthorized(req) {
  if (!API_KEY) return true;
  return req.headers['x-api-key'] === API_KEY;
}

// Returns a Vercel-compatible handler that serves `data` with auth + CORS.
module.exports = function withHandler(data) {
  return function handler(req, res) {
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!isAuthorized(req)) {
      return res.status(401).json({ error: 'Unauthorized. Provide a valid API key via the X-Api-Key header.' });
    }

    if (!data) {
      return res.status(500).json({ error: 'Failed to load data' });
    }

    return res.status(200).json(data);
  };
};
