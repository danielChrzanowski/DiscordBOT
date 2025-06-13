import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';

const name = 'druzynaogniowa';
const description = 'Calls for Destiny 2 role';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const roleId = '1348065128117178368';
        const images = ['druzynaOgniowa.png', 'druzynaOgniowa2.png'];
        try {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            await interaction.editReply({
                content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
                files: [`./src/assets/destiny/${randomImage}`]
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
