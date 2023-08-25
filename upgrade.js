const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, MessageMedia,RemoteAuth} = require('whatsapp-web.js');
const {MongoStore} = require("wwebjs-mongo")
const mongoose = require("mongoose")


// Require database
const MONGO_URI = 'mongodb+srv://bottsistemas:gB6u1ec5eP61Dzj1@botomega.emssqva.mongodb.net/?retryWrites=true&w=majority'

// Load the session data
mongoose.connect(MONGO_URI).then(() => {
    
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
			clientId:"client-one",
            store: store,
            backupSyncIntervalMs: 300000
        })
    });
    client.on("qr", qr => {
        qrcode.generate(qr, {small: true} );
    })
    client.on('remote_session_saved',()=>{
        console.log("kjfha")
    })
    client.initialize();
});