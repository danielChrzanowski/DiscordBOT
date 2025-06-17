import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commandsPath = path.join(process.cwd(), "dist", "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

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
  try {
    console.log("Started refreshing application (/) commands.");

    const commands = await loadCommands();

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
