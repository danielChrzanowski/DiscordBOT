const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");

        try {
            fetch('https://api.thecatapi.com/v1/images/search?format=json', {
                headers: { 'x-api-key': process.env.THE_CAT_API_KEY }
            }).then(function (response) { return response.json(); })
                .then(async data => {
                    const msg = await message.channel.send(data[0].url);

                    const i = getRandom.execute(0, reactions.length - 1);
                    msg.react(reactions[i]);
                });
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\nAPI koteła nie działa :(\n" + globalVariables.execute("currentDate"));
            message.reply("nie ma koteła, bo API nie działa :(");
        }
    }
}