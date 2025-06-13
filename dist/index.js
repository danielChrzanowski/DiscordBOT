// Converted from index.js to TypeScript
// EXPRESS
import express from 'express';
const server = express();
let fetch;
(async () => {
    fetch = (await import('node-fetch')).default;
})();
let i = 1;
server.use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ pingId: i }));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + PORT);
});
setInterval(async () => {
    if (fetch) {
        await fetch('https://dzieci-neo-gzr5.onrender.com')
            .then(() => {
            console.log("Ping: " + i);
            i++;
        });
    }
}, 30000);
// DISCORD
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import botStatus from './addons/botStatus.js';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates // <-- DODAJ TO!
    ]
});
import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
client.commands = new Collection();
client.events = new Collection();
import commandHandler from './handlers/command_handler.js';
import eventHandler from './handlers/event_handler.js';
(async () => {
    await commandHandler(client);
    await eventHandler(client);
})();
client.on('ready', () => {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    botStatus.execute(client);
    console.log('Dzieci Neo is online!');
});
client.login(process.env.DISCORD_TOKEN);
