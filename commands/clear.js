module.exports = {
    name: 'clear',

    //You can't delete posts older than 14 days
    async execute(client, message, args) {
        if (!args[0]) return message.reply("Podaj liczbę wiadomości do skasowania");
        if (isNaN(args[0])) return message.reply("Musisz podać liczbę w argumencie");
        if (args[0] > 100) return message.reply("Chill mon, maksymalnie możesz usunąć 100 wiadomości na raz");
        if (args[0] < 1) return message.reply("Nie da się skasować mniej niż 1 wiadomości :)");

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }

}