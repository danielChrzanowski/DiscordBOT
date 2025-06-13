import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Importuj slash buildery wszystkich komend
import { slash as clearSlash } from './commands/clear.js';
import { slash as dogeSlash } from './commands/doge.js';
import { slash as dogecounterSlash } from './commands/dogeCounter.js';
import { slash as druzynaogniowaSlash } from './commands/druzynaOgniowa.js';
import { slash as funSlash } from './commands/fun.js';
import { slash as helpSlash } from './commands/help.js';
import { slash as nekohelpSlash } from './commands/nekoHelp.js';
import { slash as ps2Slash } from './commands/ps2.js';
import { slash as sleepSlash } from './commands/sleep.js';
import { slash as summonSlash } from './commands/summon.js';
import { slash as summonfoxSlash } from './commands/summonFox.js';
import { slash as wipetimeSlash } from './commands/wipeTime.js';
import { slash as catSlash } from './commands/cat.js';

const commands = [
    clearSlash,
    dogeSlash,
    dogecounterSlash,
    druzynaogniowaSlash,
    funSlash,
    helpSlash,
    nekohelpSlash,
    ps2Slash,
    sleepSlash,
    summonSlash,
    summonfoxSlash,
    wipetimeSlash,
    catSlash,
].map(cmd => cmd.toJSON());

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