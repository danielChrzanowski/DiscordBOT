import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';

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
            console.error(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: 'Nie ma foxika, bo API nie działa :(' });
            } else {
                interaction.reply({ content: 'Nie ma foxika, bo API nie działa :(' });
            }
        }
    },
};
