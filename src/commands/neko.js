const fetch = require('node-fetch');
const getRandom = require('../addons/random.js');
const globalVariables = require('../addons/globalVariables.js');
const nekoHelp = require('./nekoHelp.js');

module.exports = {
    name: 'neko',
    description: 'Prints neko (accepts parameter)',

    async execute(client, message, args) {
        const reactions = globalVariables.execute("nekoReactions");
        const parameters = [
            'kitsune', 'hug', 'pat',
            'waifu', 'cry', 'kiss',
            'slap', 'smug', 'punch',
            'nekolewd'
        ];
        var correctParameter = true;

        if (args[0]) {
            if (args[0] == 'nekolewd') {
                if (!message.channel.nsfw)
                    return message.reply('możesz użyć tego argumentu tylko na kanale NSFW');
            }

            correctParameter = parameters.some(element => {
                return element === args[0];
            });
        }

        if (correctParameter) {
            try {
                let msg;

                if (!args.length) {
                    const { url } = await fetch('https://neko-love.xyz/api/v1/neko')
                        .then(response => response.json());
                    msg = await message.channel.send(url);
                } else {
                    const { url } = await fetch('https://neko-love.xyz/api/v1/' + args[0])
                        .then(response => response.json());
                    msg = await message.channel.send(url);
                }

                const i = getRandom.execute(0, reactions.length - 1);
                msg.react(reactions[i]);
            } catch (error) {
                console.log(error);
                client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\nAPI neko nie działa :(\n" + globalVariables.execute("currentDate"));
                message.reply("nie ma neko, bo API nie działa, albo podano zły parametr :(");
                nekoHelp.execute(client, message);
            }
        } else {
            message.reply("Podano zły parametr :(");
            nekoHelp.execute(client, message);
        }
    }
}