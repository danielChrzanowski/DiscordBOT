import random from '../addons/random.js';
import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import globalVariables from '../addons/globalVariables.js';

export const slash = new SlashCommandBuilder()
    .setName('summon')
    .setDescription('Summons tagged users')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Użytkownik do przyzwania')
            .setRequired(false)
    );

export default {
    name: 'summon',
    description: 'Summons tagged users',

    async execute(client: Client, message: Message) {
        const reactions = globalVariables.execute("cuteReactions");
        const usersToMention = message.mentions.users;

        if (usersToMention.size === 0) {
            return message.reply("Musisz oznaczyć przynajmniej jednego użytkownika, np. `-summon @Janek @Kasia`");
        }

        const repeatCount = 4;

        for (const [, user] of usersToMention) {
            const mention = `<@${user.id}>`;
            let lastIndex = -1;

            for (let i = 0; i < repeatCount; i++) {
                let newIndex;

                do {
                    newIndex = random.execute(0, reactions.length - 1);
                } while (newIndex === lastIndex && reactions.length > 1);

                lastIndex = newIndex;

                await (message.channel as TextChannel).send(`Summon ${mention} ${reactions[newIndex]}`);
            }
        }
    },

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
    }
};
