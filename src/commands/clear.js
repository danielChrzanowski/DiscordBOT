module.exports = {
    name: 'clear',
    description: 'Clears chat messages',

    //You can't delete posts older than 14 days
    async execute(client, message, args) {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply('Nie masz wystarczających uprawnień');
        if (!args[0]) return message.reply("podaj liczbę wiadomości do skasowania");
        if (isNaN(args[0])) return message.reply("musisz podać LICZBĘ w argumencie");
        if (args[0] > 100) return message.reply("chill mon, maksymalnie możesz usunąć 100 wiadomości na raz");
        if (args[0] < 1) return message.reply("nie da się skasować mniej niż 1 wiadomości :)");

        var deleteSize = parseInt(args[0]) + 1;

        await message.channel.messages.fetch({ limit: deleteSize }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }

}