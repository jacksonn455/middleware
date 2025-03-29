require('dotenv').config(); 
// Carrega as variáveis de ambiente do arquivo .env para process.env

const express = require('express');
// Framework web minimalista para Node.js, usado para criar servidores e APIs

const cors = require('cors');
// Middleware que permite requisições entre diferentes domínios (Cross-Origin Resource Sharing)

const morgan = require('morgan');
// Middleware de logging que registra requisições HTTP no console, útil para debug e monitoramento

const authMiddleware = require('./middlewares/auth');
// Middleware personalizado para autenticação de usuários

const loggerMiddleware = require('./middlewares/logger');
// Middleware personalizado para registrar logs detalhados

const errorHandler = require('./middlewares/errorHandler');
// Middleware para capturar e tratar erros da aplicação

const apiRoutes = require('./routes/api');
// Arquivo que contém as rotas da API

const app = express();

// Middlewares básicos
app.use(cors()); // Habilita CORS para permitir acesso de diferentes origens
app.use(express.json()); // Permite que a API interprete JSON no corpo das requisições
app.use(morgan('dev')); // Loga requisições HTTP no formato 'dev' (resumido)

// Middleware customizado de log
app.use(loggerMiddleware);

// Rotas
app.use('/api', apiRoutes); // Define as rotas principais da API

// Middleware de erro (deve ser o último)
app.use(errorHandler); // Captura e trata erros globalmente na API

const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando .env se disponível
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
