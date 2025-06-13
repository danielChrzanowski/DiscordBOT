import { Client, Message, TextChannel } from 'discord.js';

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
    }
};
