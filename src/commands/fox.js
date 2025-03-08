const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'fox',
    description: 'Prints random fox',

    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");

        try {
            let url;

            await fetch('https://randomfox.ca/floof/')
                .then(response => response.json())
                .then(data => url = data.image);

            const msg = await message.channel.send(url);

            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("API foxika nie działa :(");
            message.reply("nie ma foxika, bo API nie działa :(");
        }
    }
}