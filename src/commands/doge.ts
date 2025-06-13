import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const name = 'doge';
const description = 'Prints random doge';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const { default: fetch } = await import('node-fetch');
        try {
            const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
            await interaction.editReply({ content: url });
        } catch (error) {
            await interaction.editReply({ content: "nie ma pieseła, bo API nie działa :(" });
        }
    },
};