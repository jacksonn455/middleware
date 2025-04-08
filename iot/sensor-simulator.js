// PRIMEIRO ESTE O PUBLICADOR - O SENSOR SIMULATOR

const mqtt = require('mqtt'); // Biblioteca MQTT para publicar dados

const client = mqtt.connect('mqtt://test.mosquitto.org'); 
// Conecta ao broker público Mosquitto

setInterval(() => {
  const temperature = (Math.random() * 30 + 10).toFixed(2); 
  // Gera temperatura entre 10 e 40 graus (simulação aleatória)

  client.publish('sensor/temperature', temperature); 
  // Publica a temperatura no tópico 'sensor/temperature'

  console.log(`📡 Temperatura publicada: ${temperature}°C`);
}, 5000); // Envia uma nova leitura a cada 5 segundos
