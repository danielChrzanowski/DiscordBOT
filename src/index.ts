import { Client, GatewayIntentBits, Collection } from 'discord.js';
import firebaseAdmin from 'firebase-admin';
import dotenv from 'dotenv';
import botStatus from './addons/botStatus.js';
import commandHandler from './handlers/command_handler.js';
import eventHandler from './handlers/event_handler.js';
import interactionHandler from './events/interaction.js';

dotenv.config();

// Rozszerzenie typu klienta o commands/events
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
  await eventHandler(client);
}

startBot();

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
