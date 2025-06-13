import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import globalVariables from '../addons/globalVariables.js';

const name = 'nekohelp';
const description = 'Prints parameters for neko';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const nekoParameters = globalVariables.execute("nekoParameters");
        await interaction.editReply({
            content: `PARAMETRY NEKO: ${nekoParameters.join(', ')}`
        });
    },
};
