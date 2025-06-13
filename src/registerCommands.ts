import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Importuj domyślne eksporty wszystkich komend
import clearCommand from './commands/clear.js';
import dogeCommand from './commands/doge.js';
import dogecounterCommand from './commands/dogeCounter.js';
import druzynaogniowaCommand from './commands/druzynaOgniowa.js';
import funCommand from './commands/fun.js';
import helpCommand from './commands/help.js';
import nekohelpCommand from './commands/nekoHelp.js';
import ps2Command from './commands/ps2.js';
import sleepCommand from './commands/sleep.js';
import summonCommand from './commands/summon.js';
import summonfoxCommand from './commands/summonFox.js';
import wipetimeCommand from './commands/wipeTime.js';
import catCommand from './commands/cat.js';

const commands = [
    clearCommand,
    dogeCommand,
    dogecounterCommand,
    druzynaogniowaCommand,
    funCommand,
    helpCommand,
    nekohelpCommand,
    ps2Command,
    sleepCommand,
    summonCommand,
    summonfoxCommand,
    wipetimeCommand,
    catCommand,
].map(cmd => cmd.slashCommandBuilder.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();