import https from 'https';
(async function testDiscordConnection() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://discord.com/api/v10', (res) => {
      console.log('Test Discord API statusCode:', res.statusCode);
      resolve(res.statusCode);
    });
    req.on('error', (e) => {
      console.error('Test Discord API error:', e);
      reject(e);
    });
    req.setTimeout(10000, () => {
      console.error('Test Discord API timeout');
      req.destroy();
      reject(new Error('timeout'));
    });
  });
})();
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commandsPath = path.join(process.cwd(), 'dist', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

async function loadCommands() {
  const commands = [];

  for (const commandFile of commandFiles) {
    const commandFilePath = path.join(commandsPath, commandFile);

    const commandModule = await import(pathToFileURL(commandFilePath).href);
    const command = commandModule.default || commandModule;

    if (command.slashCommandBuilder) {
      commands.push(command.slashCommandBuilder.toJSON());
    }
  }

  return commands;
}

(async () => {
  // Test połączenia HTTPS do Discord API
  try {
    await testDiscordConnection();
  } catch (e) {
    console.error('Nie można połączyć się z Discord API (test HTTPS). Przerywam.');
    process.exit(1);
  }
  try {
    console.log('Started refreshing application (/) commands.');

    const commands = await loadCommands();

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
    console.log('Przed wysłaniem rest.put, liczba komend:', commands.length);
    // Dodaj timeout do requestu
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      console.error('Timeout: request do Discord API przekroczył 15 sekund.');
    }, 15000);
    try {
      const response = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
        body: commands,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      console.log('Odpowiedź Discord API:', response);
      console.log('Successfully reloaded application (/) commands.');
    } catch (err) {
      clearTimeout(timeout);
      console.error('Błąd podczas wysyłania komend do Discord API:', err instanceof Error ? err.stack : err);
    }
  } catch (error) {
    console.error(error);
  }
})();
