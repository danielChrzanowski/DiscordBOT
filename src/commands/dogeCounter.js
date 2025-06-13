module.exports = {
    name: 'dogecounter',
    description: 'Prints dogeCounter',

    async execute(client, message, args) {
        const firebase = await import('../firebase/firebaseHandler.js');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const reactions = globalVariables.execute("cuteReactions");
        const targets = message.mentions.members;

        try {
            let msg;

            if (args.length > 0) {
                for (let [, memberTarget] of targets) {
                    let displayName = memberTarget.displayName;
                    msg = await message.reply("Doge counter użytkownika \"" + displayName + "\" to: " + await firebase.default.execute("getDogeCounter", memberTarget.user.id));
                }
            } else {
                msg = await message.reply("Twój doge counter: " + await firebase.default.execute("getDogeCounter", message.author.id));
            }

            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("Baza danych firebase nie działa :(");
            message.reply("podano złe parametry albo baza danych płonie :(");
        }
    }
}