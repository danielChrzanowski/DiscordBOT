import globalVariables from '../addons/globalVariables.js';
import { Client, Message, TextChannel } from 'discord.js';

export default {
    name: 'nekohelp',
    description: 'Prints parameters for neko',

    execute(client: Client, message: Message) {
        const nekoParameters = globalVariables.execute("nekoParameters");
        (message.channel as TextChannel).send(`PARAMETRY NEKO: ${nekoParameters.join(', ')}`);
    }
};
