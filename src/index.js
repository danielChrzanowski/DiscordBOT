//EXPRESS
const express = require('express');
const server = express();
const fetch = require('node-fetch');

server.use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }));
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + PORT)
});


console.log("-------------------------");
async function pingRender() {
    setInterval(async () => {
        await fetch('https://dzieci-neo-gzr5.onrender.com/')
            .then(response => console.log("qwe"));
    }, 3000);
}

//DISCORD
const Discord = require('discord.js');
const dateBotName = require('./addons/dateBotName.js');
const client = new Discord.Client();
const firebaseAdmin = require("firebase-admin");
require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.on('ready', () => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            "projectId": process.env.FIREBASE_PROJECT_ID,
            "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    client.user.setActivity("Getting current date...", { type: 'WATCHING' });
    dateBotName.execute(client);
    console.log('Dzieci Neo is online!');
});

client.login(process.env.DISCORD_TOKEN);