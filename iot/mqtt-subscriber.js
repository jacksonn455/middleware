const mqtt = require('mqtt'); 
// Importa a biblioteca MQTT para comunicação com um broker MQTT

const client = mqtt.connect('mqtt://test.mosquitto.org'); 
// Conecta ao broker MQTT público da Mosquitto

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  
  client.subscribe('sensor/temperature'); 
  // Inscreve-se no tópico 'sensor/temperature' para receber mensagens dele
});

client.on('message', (topic, message) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`); 
  // Exibe a mensagem recebida no console

  // Aqui você poderia enviar os dados para sua API web
  // Exemplo com axios:
  // const axios = require('axios');
  // axios.post('http://localhost:3000/api/iot-data', { topic, message: message.toString() })
  //   .then(() => console.log('Dados enviados para API'))
  //   .catch(error => console.error('Erro ao enviar dados:', error));
});
