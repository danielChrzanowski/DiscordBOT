const firebase = require('../firebase/firebaseHandler.js');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'dogecounter',
    description: 'Prints dogeCounter',

    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");
       
        const msg = await message.reply("Twój doge counter: " + await firebase.execute("getDogeCounter", message.author.id));
        const i = getRandom.execute(0, reactions.length - 1);
        msg.react(reactions[i]);
    }
}