const datos = require('../programas.json');

module.exports = function handler(req, res) {
  // Cabeceras CORS para que funcione en navegadores
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar el pre-vuelo de CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Verificación de seguridad
  if (!datos) {
    return res.status(500).json({ error: "No se pudieron cargar los datos del JSON" });
  }

  // 3. Enviar la respuesta
  return res.status(200).json(datos);
}
