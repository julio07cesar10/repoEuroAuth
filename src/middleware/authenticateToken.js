import jwt from 'jsonwebtoken';

const secretKey = 'EUROMOT0RS';

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    // Verificar si el encabezado de autorización está presente
    if (!authHeader) {
      return res.status(401).json({ error: '❌Authorization header missing' });
    }
  // Verificar si el encabezado de autorización está en el formato correcto (Bearer <token>)
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: '❌Invalid authorization header format' });
  }


  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: '❌Invalid token', message: err.message });
    }
    
    // Token válido, adjuntar los datos decodificados a la solicitud para su uso posterior
    req.user = decoded;
    next();
  });
};

export { authenticateToken };
