const jwt = require('jsonwebtoken'); 
// Importa a biblioteca JSON Web Token (JWT) para autenticação

// Exporta as rotas para serem usadas na aplicação principal
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token'); 
  // Obtém o token do cabeçalho da requisição

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' }); 
    // Retorna erro 401 (Não autorizado) se o token não for enviado
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    // Verifica e decodifica o token usando a chave secreta armazenada em JWT_SECRET

    req.user = decoded; 
    // Adiciona os dados do usuário decodificados no objeto req para uso nas próximas etapas

    next(); 
    // Continua para o próximo middleware ou rota
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' }); 
    // Retorna erro 401 caso o token seja inválido ou expirado
  }
};
