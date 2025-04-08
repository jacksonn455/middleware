// Importa o framework Express, utilizado para criar servidores 
// HTTP de forma simples e rápida
const express = require('express');

// Cria uma instância da aplicação Express
const app = express();

// Middleware do Express para permitir que o servidor interprete requisições
// com corpo em formato JSON
// Ou seja, sem isso o req.body viria "vazio" ao tentar enviar dados JSON
app.use(express.json()); 

// Define uma rota POST no caminho /api/iot-data
// Essa rota será usada para receber os dados enviados por
//  dispositivos IoT (via middleware ou via curl)
// Exemplo: { "timestamp": "...", "topic": "...", "temperature": 25.5 }
app.post('/api/iot-data', (req, res) => {
  // Exibe os dados recebidos no terminal do servidor
  // Isso ajuda a verificar se o JSON foi recebido corretamente
  console.log('📥 Dados recebidos da IoT:', req.body);

  // Envia uma resposta de sucesso (status HTTP 200) de volta ao cliente
  // Pode ser o mqtt-subscriber, um curl ou qualquer outro sistema que 
  // envie dados
  res.sendStatus(200); 
});

// Inicia o servidor na porta 3000
// Quando o servidor estiver pronto para receber conexões, 
// exibe uma mensagem no terminal
app.listen(3000, () => {
  console.log('🚀 API ouvindo na porta 3000');
});
