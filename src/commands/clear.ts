import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears chat messages')
    .addIntegerOption(option =>
        option.setName('amount')
            .setDescription('Number of messages to delete (max 100)')
            .setRequired(true)
    );

export default {
    name: 'clear',
    description: 'Clears chat messages',

    async execute(client: Client, message: Message, args: string[]) {
        if (!message.member?.permissions.has('MoveMembers')) return message.reply('Nie masz wystarczających uprawnień');
        if (!args[0]) return message.reply("podaj liczbę wiadomości do skasowania");
        if (isNaN(Number(args[0]))) return message.reply("musisz podać LICZBĘ w argumencie");
        if (Number(args[0]) > 100) return message.reply("chill mon, maksymalnie możesz usunąć 100 wiadomości na raz");
        if (Number(args[0]) < 1) return message.reply("nie da się skasować mniej niż 1 wiadomości :)");

        const deleteSize = parseInt(args[0]) + 1;

        try {
            await (message.channel as TextChannel).messages.fetch({ limit: deleteSize }).then(messages => {
                (message.channel as TextChannel).bulkDelete(messages);
            });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("Kasowanie wiadomości nie działa :(");
            message.reply("siem coś popsuło, abo co :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        if (!interaction.memberPermissions?.has('MoveMembers')) {
            await interaction.reply({ content: 'Nie masz wystarczających uprawnień', ephemeral: true });
            return;
        }
        const amount = interaction.options.getInteger('amount', true);
        if (amount > 100 || amount < 1) {
            await interaction.reply({ content: 'Podaj liczbę od 1 do 100.', ephemeral: true });
            return;
        }
        try {
            const channel = interaction.channel as TextChannel;
            const messages = await channel.messages.fetch({ limit: amount + 1 });
            await channel.bulkDelete(messages);
            await interaction.reply({ content: `Usunięto ${amount} wiadomości.`, ephemeral: true });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Kasowanie wiadomości nie działa :(', ephemeral: true });
        }
    }
};
