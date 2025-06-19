import { readdir } from 'fs/promises';
import path from 'path';
import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { getRandom, handleError } from '../addons/utils.js';

const roleId = '1348065128117178368';
const imagesFolderPath = './src/assets/druzyna-ogniowa/';

const name = 'druzyna-ogniowa';
const description = 'Calls for Drużyna Ogniowa';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const files = await readdir(imagesFolderPath);
      const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

      if (images.length === 0) {
        await interaction.editReply({ content: 'Brak dostępnych obrazków :(' });
        return;
      }

      const randomImage = images[getRandom(0, images.length - 1)];
      await interaction.editReply({
        content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
        files: [{ attachment: path.join(imagesFolderPath, randomImage) }],
        allowedMentions: {
          roles: [roleId],
        },
      });
    } catch (error) {
      handleError(client, interaction, error, name, 'Siem obrazki popsuły :(');
    }
  },
};
