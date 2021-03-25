module.exports = {
    name: 'sleep',
    description: 'Disconnects voice channel users',

    execute(client, message, args, Discord) {
        if (!args.length) return message.reply('musisz podać użytkowników do uspania');
        if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply('Nie masz wystarczających uprawnień');

        const targets = message.mentions.users;
        var rand;

        if (targets) {
            targets.forEach(user => {
                if (user.id == 823862166850502657) {
                    message.reply('jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>');

                } else {
                    memberTarget = message.guild.members.cache.get(user.id);
                    if (memberTarget.voice.channel) {
                        rand = getRandomInt(0, 3);

                        switch (rand) {
                            case 0:
                                message.channel.send(`${user}, milusia kołderka <:pupperSleep:788211096481562654>`);
                                break;

                            case 1:
                                message.channel.send(`${user}, do spania dziecko drogie <:dogeSleep:781255974077464636>`);
                                break;

                            case 2:
                                message.channel.send(`${user}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`);
                                break;
                        }

                        memberTarget.voice.setChannel(null);

                    } else {
                        message.reply(`chill mon <:catGun:790433695998935090>. ${user} już śpi :sleeping:`);
                    }

                }
            });

        }
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}