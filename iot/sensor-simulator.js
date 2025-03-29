const mqtt = require('mqtt'); 
// Importa a biblioteca MQTT para comunicação com um broker MQTT

const client = mqtt.connect('mqtt://test.mosquitto.org'); 
// Conecta ao broker MQTT público da Mosquitto

setInterval(() => {
  const temperature = (Math.random() * 30 + 10).toFixed(2); 
  // Gera um valor aleatório entre 10 e 40°C e limita a duas casas decimais

  client.publish('sensor/temperature', temperature); 
  // Publica a temperatura no tópico 'sensor/temperature'

  console.log(`Temperatura publicada: ${temperature}°C`); 
  // Exibe no console a temperatura enviada
}, 5000); 
// Repete o processo a cada 5 segundos
