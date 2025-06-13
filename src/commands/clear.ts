import { Client, ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';

const name = 'clear';
const description = 'Clears chat messages';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addIntegerOption(option =>
        option.setName('amount')
            .setDescription('Number of messages to delete (max 100)')
            .setRequired(true)
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
        const amount = interaction.options.getInteger('amount', true);
        if (amount > 100 || amount < 1) {
            await interaction.editReply({ content: 'Podaj liczbę od 1 do 100.' });
            return;
        }
        try {
            const channel = interaction.channel as TextChannel;
            const messages = await channel.messages.fetch({ limit: amount + 1 });
            await channel.bulkDelete(messages);
            await interaction.editReply({ content: `Usunięto ${amount} wiadomości.` });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send('Kasowanie wiadomości nie działa :(');
            await interaction.editReply({ content: 'siem coś popsuło, abo co :(' });
        }
    },
};
