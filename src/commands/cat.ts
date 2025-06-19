import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { handleError } from '../addons/utils.js';

const name = 'cat';
const description = 'Prints a cat';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const apiData = (await fetch('https://api.thecatapi.com/v1/images/search?format=json', {
        headers: { 'x-api-key': process.env.THE_CAT_API_KEY! },
      }).then((res) => res.json())) as [{ url: string }];

      const message: Message = await interaction.editReply({
        content: apiData[0].url,
      });

      message.react(getRandomCuteReaction());
    } catch (error) {
      handleError(client, interaction, error, name, 'Nie ma koteła, bo API nie działa :(');
    }
  },
};
