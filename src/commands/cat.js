const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');

module.exports = {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client, message) {
        const reactions = [
            '<:pupperBless:781254877682729001>',
            '<:disaSmile:812821278984765490>',
            '<:bnsPlease:468750180779294751>',
            '<:catJuice:790433770092101672>'
        ];

        fetch('https://api.thecatapi.com/v1/images/search?format=json', {
            headers: { 'x-api-key': process.env.THE_CAT_API_KEY }
        }).then(function (response) { return response.json(); })
            .then(async data => {
                const msg = await message.channel.send(data[0].url);

                i = getRandom.execute(0, 3);
                msg.react(reactions[i]);
            });
    }
}