import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import firebaseAdmin from 'firebase-admin';
import botStatus from './addons/bot-status.js';
import commandHandler from './handlers/command-handler.js';
import eventHandler from './handlers/event-handler.js';
import interactionHandler from './handlers/interaction-handler.js';
import { startPingServer } from './ping-server.js';

dotenv.config();

interface CustomClient extends Client {
  commands: Collection<string, any>;
  events: Collection<string, any>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
}) as CustomClient;

client.commands = new Collection();
client.events = new Collection();

async function startBot() {
  await commandHandler(client);
  eventHandler(client);
}

startBot();
startPingServer();

function initFirebase() {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

client.on('ready', () => {
  initFirebase();
  botStatus.execute(client);
  console.log('Dzieci Neo is online!');
});

client.on('interactionCreate', interactionHandler);

client.login(process.env.DISCORD_TOKEN);
