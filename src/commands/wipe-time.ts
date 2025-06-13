import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandom, sendMessageToBotLogsChannel } from '../addons/utils.js';

const name = 'wipetime';
const description = 'Calls for BnS role';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const roleId = '1348017014869987469';
        try {
            const randomImage = `${getRandom(0, 7)}.jpg`;
            await interaction.editReply({
                content: `<@&${roleId}> It's WIPE TIME! <:catNooo:777774153402679308>`,
                files: [{ attachment: `./src/assets/bns/${randomImage}` }]
            });
        } catch (error) {
            console.error(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: 'Siem obrazki popsuły :(' });
            } else {
                interaction.reply({ content: 'Siem obrazki popsuły :(' });
            }
        }
    },
};
