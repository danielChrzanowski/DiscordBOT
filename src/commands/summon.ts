import { ChatInputCommandInteraction, Client, SlashCommandBuilder, TextChannel } from 'discord.js';
import { getRandomCuteReaction } from '../addons/reactions.js';

const maxUsersToSummonCount = 3;
const summonCount = 3;

const name = 'summon';
const description = `Summons tagged users (up to ${maxUsersToSummonCount})`;

const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option =>
        option.setName('user1')
            .setDescription('First user to summon')
            .setRequired(true),
    )
    .addUserOption(option =>
        option.setName('user2')
            .setDescription('Second user to summon (optional)')
            .setRequired(false),
    )
    .addUserOption(option =>
        option.setName('user3')
            .setDescription('Third user to summon (optional)')
            .setRequired(false),
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();


        const channel = interaction.channel as TextChannel | null;
        if (!channel) return;

        const users = [
            interaction.options.getUser('user1'),
            interaction.options.getUser('user2'),
            interaction.options.getUser('user3'),
        ].filter(Boolean);

        if (users.length === 0) {
            await interaction.followUp({ content: 'Nie podano użytkowników' });
            return;
        }

        await interaction.editReply({ content: `Przyzywam ${users.map(u => `<@${u!.id}>`).join(', ')} <:pathetic:776129039688663061>` });

        for (const user of users) {
            for (let i = 0; i < summonCount; i++) {
                await channel.send({
                    content: `Summon <@${user!.id}> ${getRandomCuteReaction()}`,
                    allowedMentions: { users: [user!.id] },
                });

                await new Promise(r => setTimeout(r, 1000));
            }
        }
    },
};
