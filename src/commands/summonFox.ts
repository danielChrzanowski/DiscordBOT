import { Client, Message, TextChannel, EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('summonfox')
    .setDescription('Summons The Fox');

export default {
    name: 'summonfox',
    description: 'Summons The Fox',

    async execute(client: Client, message: Message) {
        const { default: fetch } = await import('node-fetch');
        try {
            const imaginaryFoxId = '<@337220705252802571>';
            let url: string = '';
            await fetch('https://randomfox.ca/floof/')
                .then(response => response.json())
                .then((data: any) => url = data.image);

            const embed = new EmbedBuilder()
                .setImage(url)
                .setColor('#e67e22');
            const msg = await (message.channel as TextChannel).send({
                content: `Summon ${imaginaryFoxId} <:catNooo:777774153402679308>`,
                embeds: [embed]
            });
            msg.react('<:chibiFox:474699471670738954>');
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("API foxika nie działa :(");
            message.reply("nie ma foxika, bo API nie działa :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const { default: fetch } = await import('node-fetch');
        try {
            const imaginaryFoxId = '<@337220705252802571>';
            let url: string = '';
            await fetch('https://randomfox.ca/floof/')
                .then(response => response.json())
                .then((data: any) => url = data.image);

            const embed = new EmbedBuilder()
                .setImage(url)
                .setColor('#e67e22');
            await interaction.editReply({
                content: `Summon ${imaginaryFoxId} <:catNooo:777774153402679308>`,
                embeds: [embed]
            });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("API foxika nie działa :(");
            await interaction.editReply({ content: "nie ma foxika, bo API nie działa :(" });
        }
    }
};
