import { ChatInputCommandInteraction, Client, SlashCommandBuilder, TextChannel } from 'discord.js';
import { MAX_USERS_TO_SLEEP_COUNT } from '../addons/constants.js';
import { getRandomSleepResponse } from '../addons/sleep-response.js';
import { getUserOptions } from '../addons/utils.js';

const name = 'sleep';
const description = 'Disconnects voice channel users';
const slashCommandBuilder = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addUserOption((option) =>
    option.setName('user1').setDescription('Pierwszy użytkownik do uspania (wymagany)').setRequired(true),
  )
  .addUserOption((option) =>
    option.setName('user2').setDescription('Drugi użytkownik do uspania (opcjonalny)').setRequired(false),
  )
  .addUserOption((option) =>
    option.setName('user3').setDescription('Trzeci użytkownik do uspania (opcjonalny)').setRequired(false),
  );

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    if (!interaction.memberPermissions?.has('MoveMembers')) {
      await interaction.editReply({ content: 'Nie masz wystarczających uprawnień' });
      return;
    }

    const userOptions = getUserOptions(interaction, MAX_USERS_TO_SLEEP_COUNT);
    if (userOptions.length === 0) {
      await interaction.editReply({ content: 'Nie podałeś żadnych użytkowników do uspania' });
      return;
    }

    if (userOptions.some((user) => user.id === '823862166850502657')) {
      await interaction.editReply({ content: 'Jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>' });
      return;
    }

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply({ content: 'Nie można znaleźć gildii' });
      return;
    }

    const channel = interaction.channel as TextChannel | null;
    if (!channel) {
      await interaction.editReply({ content: 'Nie znaleziono kanału' });
      return;
    }

    for (const user of userOptions) {
      try {
        const memberTarget = await guild.members.fetch(user.id);
        const mention = `<@${user.id}>`;

        if (memberTarget.voice && memberTarget.voice.channelId) {
          let response = getRandomSleepResponse(mention);

          await memberTarget.voice.setChannel(null);
          await channel.send({
            content: response,
            allowedMentions: { users: [user!.id] },
          });
        } else {
          await channel.send({
            content: `Chill mon <:catGun:790433695998935090>. ${mention} już śpi :sleeping:`,
            allowedMentions: { users: [user!.id] },
          });
        }
      } catch {
        await channel.send({
          content: `Nie można znaleźć użytkownika ${user.tag}`,
          allowedMentions: { users: [user!.id] },
        });
      }
    }

    await interaction.editReply({ content: 'Wszyscy uspani :sleeping:' });
  },
};
