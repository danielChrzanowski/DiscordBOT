import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { readdir } from 'fs/promises';
import path from 'path';
import { getRandom, sendMessageToBotLogsChannel } from '../addons/utils.js';

const roleId = '1348017014869987469';
const imagesFolderPath = './src/assets/bns/';

const name = 'wipe-time';
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

        try {
            const files = await readdir(imagesFolderPath);
            const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

            if (images.length === 0) {
                await interaction.editReply({ content: 'Brak dostępnych obrazków :(' });
                return;
            }

            const randomImage = images[getRandom(0, images.length - 1)];
            await interaction.editReply({
                content: `<@&${roleId}> It's WIPE TIME! <:catNooo:777774153402679308>`,
                files: [{ attachment: path.join(imagesFolderPath, randomImage) }],
                allowedMentions: {
                    roles: [roleId]
                }
            });
        } catch (error) {
            console.error(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({ content: 'Siem obrazki popsuły :(' });
            } else {
                await interaction.reply({ content: 'Siem obrazki popsuły :(' });
            }
        }
    },
};
