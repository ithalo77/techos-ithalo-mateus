const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const cabecalhoAuth = req.headers.authorization || '';
  const [esquema, token] = cabecalhoAuth.split(' ');

  if (esquema !== 'Bearer' || !token) {
    return res.status(401).json({
      sucesso: false,
      dados: null,
      mensagem: 'Token de autenticação ausente ou mal formatado.'
    });
  }

  try {
    const segredo = process.env.JWT_SECRET || 'chave_desenvolvimento_techos';
    const payload = jwt.verify(token, segredo);
    req.usuario = payload;
    return next();
  } catch (error) {
    return res.status(401).json({
      sucesso: false,
      dados: null,
      mensagem: 'Token inválido ou expirado.'
    });
  }
}

module.exports = autenticarToken;