import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getChannel, handleError } from '../addons/utils.js';

const imaginaryFoxId = '<@337220705252802571>';

const name = 'summon-fox';
const description = 'Summons The Fox';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    try {
      let foxImageUrl: string = '';
      await fetch('https://randomfox.ca/floof/')
        .then((response) => response.json())
        .then((data: any) => (foxImageUrl = data.image));

      const channel = await getChannel(interaction);
      if (!channel) return;

      const embed = new EmbedBuilder().setImage(foxImageUrl).setColor('#e67e22');
      await channel.send({
        content: `Summon ${imaginaryFoxId} <:catNooo:777774153402679308>`,
        embeds: [embed],
      });
    } catch (error) {
      handleError(client, interaction, error, name, 'Nie ma foxika, bo API nie działa :(');
    }
  },
};
