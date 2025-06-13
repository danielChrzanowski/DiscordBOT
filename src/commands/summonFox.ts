import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const name = 'summonfox';
const description = 'Summons The Fox';
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
            if (logChannel && (logChannel as any).send) (logChannel as any).send("API foxika nie działa :(");
            await interaction.editReply({ content: "nie ma foxika, bo API nie działa :(" });
        }
    },
};
