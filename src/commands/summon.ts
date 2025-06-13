import random from '../addons/random.js';
import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import globalVariables from '../addons/globalVariables.js';

const name = 'summon';
const description = 'Summons tagged users';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Użytkownik do przyzwania')
            .setRequired(false)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const reactions = globalVariables.execute("cuteReactions");
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.editReply({ content: 'Musisz podać użytkownika do przyzwania' });
            return;
        }
        const mention = `<@${user.id}>`;
        let lastIndex = -1;
        const repeatCount = 4;
        let messages = [];
        for (let i = 0; i < repeatCount; i++) {
            let newIndex;
            do {
                newIndex = random.execute(0, reactions.length - 1);
            } while (newIndex === lastIndex && reactions.length > 1);
            lastIndex = newIndex;
            messages.push(`Summon ${mention} ${reactions[newIndex]}`);
        }
        await interaction.reply({ content: messages.join('\n') });
    },
};
