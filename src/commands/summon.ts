import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { getRandom } from '../addons/utils.js';
import { getRandomCuteReaction } from '../addons/reactions.js';

const repeatCount = 4;

const name = 'summon';
const description = 'Summons tagged users';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Użytkownik do przyzwania')
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const user = interaction.options.getUser('user');

        if (!user) {
            await interaction.editReply({ content: 'Musisz podać użytkownika do przyzwania' });
            return;
        }
        const mention = `<@${user.id}>`;
        let messages = [];

        messages.push(`Summon ${mention} ${getRandomCuteReaction}`);
        await interaction.reply({ content: messages.join('\n') });
    }

};
