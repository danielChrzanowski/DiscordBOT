import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';

const name = 'doge-counter';
const description = 'Prints doge-counter';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option =>
        option.setName('user')
            .setDescription('User to check doge-counter for')
            .setRequired(false)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const firebase = await import('../firebase/firebase-handler.js');
        const passedUser = interaction.options.getUser('user');

        try {
            let reply: string;
            const userToCheck = passedUser ? passedUser : interaction.user;
            const dogeCount = await firebase.default.execute("getDogeCounter", userToCheck.id, userToCheck.username);

            if (passedUser) {
                reply = `Doge counter użytkownika "${passedUser.username}" to: ${dogeCount}`;
            } else {
                reply = `Twój doge counter: ${dogeCount}`;
            }

            const message: Message = await interaction.editReply({ content: reply });
            message.react(getRandomCuteReaction());
        } catch (error) {
            console.log(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: "Podano złe parametry albo baza danych płonie :(" });
            } else {
                interaction.reply({ content: "Podano złe parametry albo baza danych płonie :(" });
            }
        }
    },
};
