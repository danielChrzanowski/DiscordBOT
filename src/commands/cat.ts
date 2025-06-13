import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import getRandom from '../addons/random.js';
import globalVariables from '../addons/globalVariables.js';

export const slash = new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Prints random cat');

export default {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client: Client, message: Message) {
        const reactions = globalVariables.execute('cuteReactions');
        try {
            const { default: fetch } = await import('node-fetch');
            const data = await fetch('https://api.thecatapi.com/v1/images/search?format=json', {
                headers: { 'x-api-key': process.env.THE_CAT_API_KEY! }
            }).then(res => res.json()) as [{ url: string }];
            const msg = await (message.channel as TextChannel).send(data[0].url);
            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send('API koteła nie działa :(');
            message.reply('nie ma koteła, bo API nie działa :(');
        }
    },

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
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send('API koteła nie działa :(');
            await interaction.editReply({ content: 'nie ma koteła, bo API nie działa :(' });
        }
    }
};
