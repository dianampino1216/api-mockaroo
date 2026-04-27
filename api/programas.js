import datos from '../programas.json';

export default function handler(req, res) {
  // Configurar cabeceras CORS (Muy importante para que tu frontend pueda leer la API)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite peticiones desde cualquier lugar
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responder a la petición pre-vuelo (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Responder con tus datos de Mockaroo
  res.status(200).json(datos);
}
