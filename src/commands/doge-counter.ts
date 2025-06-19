import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { handleError } from '../addons/utils.js';
import { getDogeCounter } from '../firebase/firebase-handler.js';

const name = 'doge-counter';
const description = 'Prints doge-counter';
const slashCommandBuilder = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addUserOption((option) =>
    option.setName('user').setDescription('User to check doge-counter for').setRequired(false),
  );

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const passedUser = interaction.options.getUser('user');

    try {
      let reply: string;
      const userToCheck = passedUser ? passedUser : interaction.user;
      const dogeCount = await getDogeCounter(userToCheck.id);

      if (passedUser) {
        reply = `Doge counter użytkownika "${passedUser.globalName}" to: ${dogeCount}`;
      } else {
        reply = `Twój doge counter: ${dogeCount}`;
      }

      const message: Message = await interaction.editReply({ content: reply });
      message.react(getRandomCuteReaction());
    } catch (error) {
      handleError(client, interaction, error, name, 'Podano złe parametry albo baza danych płonie :(');
    }
  },
};
