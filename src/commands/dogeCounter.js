const firebase = require('../firebase/firebaseHandler.js');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'dogecounter',
    description: 'Prints dogeCounter',

    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");

        try {
            const msg = await message.reply("Twój doge counter: " + await firebase.execute("getDogeCounter", message.author.id));
            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);

        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\nBaza danych firebase nie działa :(\n" + globalVariables.execute("currentDate"));
            message.reply("nie ma, bo baza danych płonie :(");
        }
    }
}