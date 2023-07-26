const fs = require('fs');

function guardarSesion(session) {
  // Convertir la sesión a formato JSON
  const sessionData = JSON.stringify(session);

  // Guardar la sesión en un archivo local
  fs.writeFileSync('whatsapp-session.json', sessionData, 'utf8');

  console.log('Sesión guardada correctamente.');
}

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
  console.log('Authenticated');
  // Guardar la sesión en algún lugar seguro (puedes usar una base de datos o simplemente un archivo)
  guardarSesion(session);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();


