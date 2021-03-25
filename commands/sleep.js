module.exports = {
    name: 'sleep',
    description: 'Disconnects voice channel users',

    execute(client, message, args, Discord) {
        if (!args.length) return message.reply('Musisz podać użytkowników do uspania');
        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply('Nie masz wystarczających uprawnień');

        const targets = message.mentions.users;

        if (targets) {
            targets.forEach(user => {
                if (user.id == 823862166850502657) {
                    message.reply('Jak śmiesz próbować mnie kickować O-O');

                } else {
                    memberTarget = message.guild.members.cache.get(user.id);
                    message.channel.send(`${user}, do spania dziecko drogie :sleeping:`);
                    memberTarget.voice.setChannel(null);
                }
            });

        }
    }

}
