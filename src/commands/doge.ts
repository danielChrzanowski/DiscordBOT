import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { handleError } from '../addons/utils.js';
import { incrementDogeCounter } from '../firebase/firebase-handler.js';

const name = 'doge';
const description = 'Prints a doge';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();
      const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
      const message: Message = await interaction.editReply({ content: url });
      try {
        await message.react(getRandomCuteReaction());
      } catch (err) {
        console.error('Failed to react to message:', err);
      }

      try {
        await incrementDogeCounter(interaction.user.id, interaction.user.username);
      } catch (err) {
        console.error('Failed to increment doge counter:', err);
      }
    } catch (error) {
      await handleError(client, interaction, error, name, 'Nie ma pieseła, bo API nie działa :(');
    }
  },
};
