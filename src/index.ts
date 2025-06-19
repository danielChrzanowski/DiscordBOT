import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import botStatus from './addons/bot-status.js';
import commandHandler from './handlers/command-handler.js';
import interactionHandler from './handlers/interaction-handler.js';
import { startPingServer } from './ping-server.js';

dotenv.config();

interface CustomClient extends Client {
  commands: Collection<string, any>;
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

await commandHandler(client);
startPingServer();

client.on('ready', () => {
  botStatus.execute(client);
  console.log('Dzieci Neo is online!');
});
client.on('interactionCreate', interactionHandler);
client.login(process.env.DISCORD_TOKEN);
