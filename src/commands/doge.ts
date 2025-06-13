import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import firebase from '../firebase/firebase-handler.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { sendMessageToBotLogsChannel } from '../addons/utils.js';

const name = 'doge';
const description = 'Prints random doge';
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
            const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
            const message: Message = await interaction.editReply({ content: url });
            message.react(getRandomCuteReaction());

            firebase.execute("setDogeCounter", interaction.user.id, interaction.user.username);
        } catch (error) {
            console.error(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: 'Nie ma pieseła, bo API nie działa :(' });
            } else {
                interaction.reply({ content: 'Nie ma pieseła, bo API nie działa :(' });
            }
        }
    },
};
