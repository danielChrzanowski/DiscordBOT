import { ChatInputCommandInteraction, Client, Message, SlashCommandBuilder, TextChannel } from "discord.js";
import { getRandomNekoReaction } from "../addons/reactions.js";
import { getRandom, handleError } from "../addons/utils.js";

type NekoApiResponse = { items: { url: string }[] };

const nekoParameters = ["safe", "suggestive", "borderline", "explicit"];
const NSFWParameters = ["explicit"];

const name = "neko";
const description = "Prints neko";
const slashCommandBuilder = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addStringOption((option) => option.setName("parameter").setDescription(nekoParameters.join(", ")).setRequired(true));

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const param = interaction.options.getString("parameter", true);

    if (!nekoParameters.includes(param)) {
      await interaction.editReply("Podano zły parametr :(");
      return;
    }

    if (NSFWParameters.includes(param) && interaction.channel && !(interaction.channel as TextChannel).nsfw) {
      await interaction.editReply("Możesz użyć tego argumentu tylko na kanale NSFW");
      return;
    }

    try {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.append("rating", param);
      const response = await fetch(`https://api.nekosapi.com/v4/images?${urlSearchParams}`).then(
        (res) => res.json() as Promise<NekoApiResponse>,
      );

      if (!response.items || response.items.length === 0) {
        await interaction.editReply("Brak wyników dla tego parametru.");
        return;
      }

      const randomImageIndex = getRandom(0, response.items.length - 1);
      const message: Message = await interaction.editReply(response.items[randomImageIndex].url);
      message.react(getRandomNekoReaction());
    } catch (error) {
      handleError(client, interaction, error, name, "Nie ma neko, bo API nie działa :(");
    }
  },
};
