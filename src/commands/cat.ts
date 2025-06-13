import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import globalVariables from '../addons/globalVariables.js';

const name = 'cat';
const description = 'Prints random cat';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const reactions = globalVariables.execute('cuteReactions');
        try {
            const { default: fetch } = await import('node-fetch');
            const data = await fetch('https://api.thecatapi.com/v1/images/search?format=json', {
                headers: { 'x-api-key': process.env.THE_CAT_API_KEY! }
            }).then(res => res.json()) as [{ url: string }];
            await interaction.editReply({ content: data[0].url });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as any).send) (logChannel as any).send('API koteła nie działa :(');
            await interaction.editReply({ content: 'nie ma koteła, bo API nie działa :(' });
        }
    },
};
