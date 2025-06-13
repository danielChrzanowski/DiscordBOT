import globalVariables from '../addons/globalVariables.js';
import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('nekohelp')
    .setDescription('Prints parameters for neko');

export default {
    name: 'nekohelp',
    description: 'Prints parameters for neko',

    execute(client: Client, message: Message) {
        const nekoParameters = globalVariables.execute("nekoParameters");
        (message.channel as TextChannel).send(`PARAMETRY NEKO: ${nekoParameters.join(', ')}`);
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const nekoParameters = globalVariables.execute("nekoParameters");
        await interaction.editReply({
            content: `PARAMETRY NEKO: ${nekoParameters.join(', ')}`
        });
    }
};
