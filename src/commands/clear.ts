import { ChatInputCommandInteraction, Client, SlashCommandBuilder, TextChannel } from 'discord.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';
import { MAX_MESSAGES_TO_DELETE_COUNT } from '../addons/constants.js';

const name = 'clear';
const description = 'Clears chat messages';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addIntegerOption(option =>
        option.setName('amount')
            .setDescription(`Number of messages to delete (max ${MAX_MESSAGES_TO_DELETE_COUNT})`)
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        if (!interaction.memberPermissions?.has('MoveMembers')) {
            await interaction.editReply({ content: 'Nie masz wystarczających uprawnień' });
            return;
        }

        const amount = interaction.options.getInteger('amount', true);
        if (amount > MAX_MESSAGES_TO_DELETE_COUNT || amount < 1) {
            await interaction.editReply({ content: `Podaj liczbę od 1 do ${MAX_MESSAGES_TO_DELETE_COUNT}.` });
            return;
        }

        try {
            const channel = interaction.channel as TextChannel;
            const messages = await channel.messages.fetch({ limit: amount + 1 });
            await channel.bulkDelete(messages);
        } catch (error) {
            console.log(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: 'Kasowanie nie działa. Siem coś popsuło, abo co :(' });
            } else {
                interaction.reply({ content: 'Kasowanie nie działa. Siem coś popsuło, abo co :(' });
            }
        }
    },
};
