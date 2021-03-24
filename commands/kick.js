module.exports = {
    name: 'kick',

    execute(client, message, args, Discord) {
        if (!args.length) return message.reply('Musisz podać użytkowników do uspania');

        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.reply('Musisz być na kanale głosowym, żeby kickować');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('DISCONNECT')) return message.reply('Nie masz wystarczających uprawnień');

        const targets = message.mentions.users;

        if (targets) {
            targets.forEach(user => {
                if (user.id == 823862166850502657) {
                    message.reply('Jak śmiesz próbować mnie kickować O-O');

                } else {
                    memberTarget = message.guild.members.cache.get(user.id);
                    message.channel.send(`${user} do spania dziecko drogie :sleeping:`);
                    memberTarget.voice.setChannel(null);
                }
            });

        } else {
            message.channel.send(`Nie możesz rozłączyć tego użytkownika`);
        }
    }
}
