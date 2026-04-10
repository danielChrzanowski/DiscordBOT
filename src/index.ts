import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import initBotActivitiesInterval from './addons/bot-activities-interval.js';
import { initExpressServer } from './addons/express-server.js';
import attachProxyErrorHandlers from './addons/proxy-error-handler.js';
import proxyManager from './addons/proxy-manager.js';
import commandHandler from './handlers/command-handler.js';
import interactionHandler from './handlers/interaction-handler.js';

// dotenv is loaded via import 'dotenv/config' above

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
  rest: {
    agent: proxyManager.getAgent() as any,
  },
}) as CustomClient;

client.commands = new Collection();

await commandHandler(client);
initExpressServer();

client.on('clientReady', () => {
  initBotActivitiesInterval(client);
  console.log(`PID: ${process.pid} - Dzieci Neo is online!`);
});
client.on('interactionCreate', interactionHandler);

attachProxyErrorHandlers(client, proxyManager);

client.login(process.env.DISCORD_TOKEN);
