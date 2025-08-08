// middlewares/authenticateJWT.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  console.log('Authorization Header:', req.headers.authorization);

  const token = authHeader.split(' ')[1];
  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ✅ Aquí se adjunta el usuario al request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authenticateJWT;
