import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';
import { getInteractionMentionedUsers } from '../addons/utils.js';

const name = 'summon';
const description = 'Summons tagged users';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option =>
        option.setName('users')
            .setDescription('Users to summon')
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const userIds = getInteractionMentionedUsers(interaction);

        if (userIds.length === 0) {
            await interaction.editReply({ content: 'Nie podano żadnych użytkowników do przyzwania' });
            return;
        }

        const messages = userIds.map(id => `Summon <@${id}> ${getRandomCuteReaction()}`);
        await interaction.editReply({ content: messages.join('\n') });
    }
};
