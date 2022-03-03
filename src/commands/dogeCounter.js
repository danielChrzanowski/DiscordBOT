const firebase = require('../firebase/firebaseHandler.js');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'dogecounter',
    description: 'Prints dogeCounter',

    async execute(client, message, args) {
        const reactions = globalVariables.execute("cuteReactions");
        const targets = message.mentions.users;

        try {
            let msg;

            if (args.length > 0) {
                for (let user of targets) {
                    let memberTarget = message.guild.members.cache.get(user[1].id);
                    let nickname = memberTarget.nickname ? memberTarget.nickname : memberTarget.user.username;
                    msg = await message.reply("Doge counter użytkownika \"" + nickname + "\" to: " + await firebase.execute("getDogeCounter", memberTarget.user.id));
                }
            } else {
                msg = await message.reply("Twój doge counter: " + await firebase.execute("getDogeCounter", message.author.id));
            }

            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\nBaza danych firebase nie działa :(\n" + globalVariables.execute("currentDate"));
            message.reply("podano złe parametry albo baza danych płonie :(");
        }
    }
}