// PRIMEIRO O SENSOR SIMULATOR - O PUBLICADOR
// DEPOIS ESTE O SUBSCRIBER - O ASSINANTE

const mqtt = require('mqtt'); // Importa a biblioteca MQTT
const fs = require('fs'); // Módulo para manipular arquivos
const axios = require('axios'); // Módulo para enviar requisições HTTP

const client = mqtt.connect('mqtt://test.mosquitto.org'); 
// Conecta ao broker MQTT

client.on('connect', () => {
  console.log('✅ Conectado ao broker MQTT');
  
  client.subscribe('sensor/temperature'); 
  // Inscreve-se no tópico para receber dados
});

client.on('message', (topic, message) => {
  const temperature = parseFloat(message.toString()); 
  // Converte o valor para número
  const timestamp = new Date().toISOString(); 
  // Gera a data/hora atual no formato ISO
  
  // Exibe no console com a data e a temperatura
  console.log(`[${timestamp}] Temperatura recebida: ${temperature}°C`);

  // Só processa se a temperatura for maior que 30°C
  if (temperature > 30) {
    console.log('⚠️ Temperatura acima do normal! Enviando para API...');

    // Exemplo de envio para uma API (pode simular com um servidor Express)
    axios.post('http://localhost:3000/api/iot-data', {
      timestamp,
      topic,
      temperature
    })
    .then(() => console.log('📤 Dados enviados com sucesso para a API!'))
    .catch(err => console.error('❌ Erro ao enviar dados para API:', err.message));
  }

  // Salva os dados em um arquivo local (pode ser .txt ou .json)
  const logLine = `${timestamp} - Temperatura: ${temperature}°C\n`;
  fs.appendFile('dados-temperatura.txt', logLine, (err) => {
    if (err) console.error('Erro ao salvar dados:', err.message);
  });
});

// Tratamento de erro de conexão com o broker
client.on('error', (err) => {
  console.error('❌ Erro na conexão com o broker MQTT:', err.message);
});
