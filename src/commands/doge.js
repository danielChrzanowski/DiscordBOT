const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');
const firebase = require('../firebase/firebaseHandler.js');

module.exports = {
    name: 'doge',
    description: 'Prints random doge',

    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");

        try {
            const { url } = await fetch('https://random.dog/woof.json')
                .then(response => response.json());

            const msg = await message.channel.send(url);

            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);

            await firebase.execute("setDogeCounter", message.author.id, message.author.username);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("API pieseła nie działa :(");
            message.reply("nie ma pieseła, bo API nie działa :(");
        }
    }
}