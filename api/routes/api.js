const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware de autenticação para proteger rotas

// Rota pública
router.get('/public', (req, res) => {
  res.json({ message: 'Esta é uma rota pública' }); 
  // Qualquer usuário pode acessar esta rota
});

// Rota para login (simulado)
router.post('/login', (req, res) => {
  // Em um caso real, verificar credenciais no banco de dados
  const { username, password } = req.body;

  if (username === 'admin' && password === '123456') {
    const token = jwt.sign(
      { userId: 1, username: 'admin' }, // Payload do token (dados do usuário)
      process.env.JWT_SECRET, // Chave secreta para assinar o token
      { expiresIn: '1h' } // Tempo de expiração do token
    );
    return res.json({ token }); 
    // Retorna o token JWT para ser usado em futuras requisições autenticadas
  }

  res.status(401).json({ message: 'Credenciais inválidas' }); 
  // Retorna erro 401 caso as credenciais estejam incorretas
});

module.exports = router; 
// Exporta as rotas para serem usadas na aplicação principal
