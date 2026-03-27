import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import initBotActivitiesInterval from './addons/bot-activities-interval.js';
import { initExpressServer } from './addons/express-server.js';
import commandHandler from './handlers/command-handler.js';
import interactionHandler from './handlers/interaction-handler.js';
import proxyManager from './addons/proxy-manager.js';

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
  rest: {
    agent: proxyManager.getAgent() as any,
  },
}) as CustomClient;

client.commands = new Collection();

await commandHandler(client);
initExpressServer();

client.on('clientReady', () => {
  initBotActivitiesInterval(client);
  console.log('Dzieci Neo is online!');
});
client.on('interactionCreate', interactionHandler);
// rotate proxy on unhandled errors and attempt to update the client's REST agent
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  try {
    const agent = proxyManager.rotate();
    if ((client as any).rest) {
      try {
        // try to set agent directly
        (client as any).rest.agent = agent;
      } catch (e) {
        try {
          // fallback: recreate REST instance if possible
          const RestCtor = (client as any).rest?.constructor;
          if (RestCtor) {
            (client as any).rest = new RestCtor({ version: '10', agent }).setToken(process.env.DISCORD_TOKEN);
          }
        } catch (err) {
          console.error('Failed to update client.rest agent', err);
        }
      }
    }
  } catch (err) {
    console.error('Failed rotating proxy after unhandledRejection', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  try {
    proxyManager.rotate();
  } catch (e) {
    console.error('Failed rotating proxy after uncaughtException', e);
  }
});

client.login(process.env.DISCORD_TOKEN);
