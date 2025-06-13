export default {
    name: 'sleep',
    description: 'Disconnects voice channel users',
    async execute(client, message, args) {
        if (!args.length)
            return message.reply('musisz podać użytkowników do uspania');
        if (!message.member?.permissions.has('MoveMembers'))
            return message.reply('Nie masz wystarczających uprawnień');
        const targets = message.mentions.users;
        let rand;
        if (targets) {
            for (const user of targets.values()) {
                if (user.id == '823862166850502657') {
                    message.reply('jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>');
                }
                else {
                    if (!message.guild) {
                        message.reply('Nie można znaleźć gildii.');
                        continue;
                    }
                    let memberTarget = await message.guild.members.fetch(user.id);
                    if (memberTarget.voice && memberTarget.voice.channelId) {
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
                    }
                    else {
                        message.reply(`chill mon <:catGun:790433695998935090>. ${user} już śpi :sleeping:`);
                    }
                }
            }
        }
    }
};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
