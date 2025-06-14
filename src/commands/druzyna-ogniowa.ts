import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandom, sendMessageToBotLogsChannel } from '../addons/utils.js';
import { readdir } from 'fs/promises';
import path from 'path';

const roleId = '1348065128117178368';
const imagesFolderPath = './src/assets/druzyna-ogniowa/';

const name = 'druzyna-ogniowa';
const description = 'Calls for Drużyna Ogniowa';
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
            const files = await readdir(imagesFolderPath);
            const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

            if (images.length === 0) {
                await interaction.editReply({ content: 'Brak dostępnych obrazków :(' });
                return;
            }

            const randomImage = images[getRandom(0, images.length - 1)];
            await interaction.editReply({
                content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
                files: [{ attachment: path.join(imagesFolderPath, randomImage) }]
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
