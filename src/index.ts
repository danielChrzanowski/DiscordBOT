import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import initBotStatuses from './addons/bot-statuses.js';
import { initServerPingInterval } from './addons/server-ping-interval.js';
import commandHandler from './handlers/command-handler.js';
import interactionHandler from './handlers/interaction-handler.js';

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
initServerPingInterval();

client.once('clientReady', () => {
  initBotStatuses(client);
  console.log('Dzieci Neo is online!');
});
client.once('interactionCreate', interactionHandler);
client.login(process.env.DISCORD_TOKEN);
