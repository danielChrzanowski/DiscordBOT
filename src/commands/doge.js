const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');

module.exports = {
    name: 'doge',
    description: 'Prints random doge',

    async execute(client, message) {
        const reactions = [
            '<:pupperBless:781254877682729001>',
            '<:disaSmile:812821278984765490>',
            '<:bnsPlease:468750180779294751>',
            '<:catJuice:790433770092101672>'
        ];

        const { url } = await fetch('https://random.dog/woof.json')
            .then(response => response.json());

        const msg = await message.channel.send(url);

        i = getRandom.execute(0, 3);
        msg.react(reactions[i]);
    }
}