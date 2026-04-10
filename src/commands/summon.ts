import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { MAX_USERS_TO_SUMMON_COUNT } from '../addons/constants.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { getChannel, getUserOptions } from '../addons/utils.js';

const summonCount = 5;

const name = 'summon';
const description = `Summons tagged users (up to ${MAX_USERS_TO_SUMMON_COUNT})`;
const slashCommandBuilder = new SlashCommandBuilder()
  .setName(name)
  .setDescription(description)
  .addUserOption((option) => option.setName('user1').setDescription('First user to summon').setRequired(true))
  .addUserOption((option) =>
    option.setName('user2').setDescription('Second user to summon (optional)').setRequired(false),
  )
  .addUserOption((option) =>
    option.setName('user3').setDescription('Third user to summon (optional)').setRequired(false),
  );

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    try {
      await interaction.deferReply();

      const users = getUserOptions(interaction, MAX_USERS_TO_SUMMON_COUNT);
      if (users.length === 0) {
        await interaction.followUp({ content: 'Nie podano użytkowników' });
        return;
      }

      const channel = await getChannel(interaction);
      if (!channel) return;

      await interaction.editReply({
        content: `Przyzywam ${users.map((u) => `<@${u!.id}>`).join(', ')} <:pathetic:776129039688663061>`,
      });

      for (const user of users) {
        for (let i = 0; i < summonCount; i++) {
          await channel.send({
            content: `Summon <@${user!.id}> ${getRandomCuteReaction()}`,
            allowedMentions: { users: [user!.id] },
          });
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    } catch (error) {
      console.error('Error in summon command:', error);
      try {
        await interaction.reply({ content: 'Wystąpił błąd podczas przyzywania użytkowników', flags: 64 });
      } catch (e) {
        console.error('Failed to send error reply in summon command:', e);
      }
    }
  },
};
