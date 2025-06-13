import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('doge')
    .setDescription('Prints random doge');

export default {
    name: 'doge',
    description: 'Prints random doge',

    async execute(client: Client, message: Message) {
        const { default: fetch } = await import('node-fetch');
        try {
            const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
            await (message.channel as TextChannel).send(url);
        } catch (error) {
            await (message.channel as TextChannel).send("nie ma pieseła, bo API nie działa :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const { default: fetch } = await import('node-fetch');
        try {
            const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
            await interaction.editReply({ content: url });
        } catch (error) {
            await interaction.editReply({ content: "nie ma pieseła, bo API nie działa :(" });
        }
    }
};