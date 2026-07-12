import { readdir } from 'fs/promises';
import path from 'path';
import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { getChannel, getRandom, handleError } from '../addons/utils.js';

const roleId = '1348065128117178368';
const imagesFolderPath = './src/assets/druzyna-ogniowa/';

const name = 'druzyna-ogniowa';
const description = 'Calls for Drużyna Ogniowa';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

let currentImageIndex = -1;
let hasPickedRandomImage = false;

function getNextImage(images: string[]) {
  if (images.length === 0) return undefined;

  if (!hasPickedRandomImage) {
    currentImageIndex = getRandom(0, images.length - 1);
    hasPickedRandomImage = true;
    return images[currentImageIndex];
  }

  currentImageIndex = (currentImageIndex + 1) % images.length;
  return images[currentImageIndex];
}

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();

      const files = await readdir(imagesFolderPath);
      const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

      if (images.length === 0) {
        await interaction.editReply({ content: 'Brak dostępnych obrazków :(' });
        return;
      }

      const channel = await getChannel(interaction);
      if (!channel) return;

      const randomImage = getNextImage(images);
      if (!randomImage) {
        await interaction.editReply({ content: 'Brak dostępnych obrazków :(' });
        return;
      }

      await channel.send({
        content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
        files: [{ attachment: path.join(imagesFolderPath, randomImage) }],
        allowedMentions: {
          roles: [roleId],
        },
      });
      await interaction.editReply({
        content: `Drużyna Ogniowa przyzwana <:catJuice:790433770092101672>`,
      });
    } catch (error) {
      await handleError(client, interaction, error, name, 'Siem obrazki popsuły :(');
    }
  },
};
