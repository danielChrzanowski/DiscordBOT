import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { handleError } from '../addons/utils.js';
import { setDogeCounter } from '../firebase/firebase-handler.js';

const name = 'doge';
const description = 'Prints a doge';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

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

      setDogeCounter(interaction.user.id, interaction.user.username);
    } catch (error) {
      handleError(client, interaction, error, name, 'Nie ma pieseła, bo API nie działa :(');
    }
  },
};
