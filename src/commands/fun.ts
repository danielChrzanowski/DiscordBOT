import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';

const name = 'fun';
const description = 'Shows fun photo';
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
            await interaction.editReply({
                content: `Fun <:uganda:783095652212670514>`,
                files: ["./src/assets/destiny/fun.png"]
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
