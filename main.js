const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log("Woas");
});
 
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('message', async message => {
    const hptaTodo = await message.getChat();
    console.log(hptaTodo.isGroup)
	console.log(message.body);
});
client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
    if(message.body === '!calendario') {
		client.sendMessage(message.from, 'info de calendario');
	}
    if(message.body === '!matricula0') {
		client.sendMessage(message.from, 'info de matricula 0');
	}
    if(message.body === '!solicitudes') {
		client.sendMessage(message.from, 'info de solicitudes');
	}
    if(message.body === '!bienestar') {
		client.sendMessage(message.from, 'info de bienestar');
	}
});
 
client.initialize();



