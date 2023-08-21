const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');

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
client.on('message', async message => {
	const chat = await message.getChat();

	if(message.body === '!ping') {
		//client.sendMessage(message.from, 'pong');
		const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
		console.log("Unix timestamp actual:", currentTimestampInSeconds);
		console.log(chat.timestamp)
		chat.sendSeen()
		chat.markUnread()
	}

    if(message.body === '!calendario') {
		const media = await MessageMedia.fromUrl('https://www.formatpdf.com/wp-content/uploads/2023/04/Archivo-PDF-e-blanco.pdf');
		client.sendMessage(message.from, media);
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



