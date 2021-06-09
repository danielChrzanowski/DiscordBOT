const fetch = require('node-fetch');

module.exports = {
    name: 'neko',
    description: 'Prints neko with parameter',

    async execute(client, message, args) {
        tags = ['nekolewd'];

        for (i of tags) {
            if (i == args[0]) {
                if (!message.channel.nsfw)
                    return message.reply('możesz użyć tego argumentu tylko na kanale NSFW');
            }
        }

        if (!args.length) {
            const { url } = await fetch('https://neko-love.xyz/api/v1/neko')
                .then(response => response.json());
            message.channel.send(url);
        } else {
            const { url } = await fetch('https://neko-love.xyz/api/v1/' + args[0])
                .then(response => response.json());
            message.channel.send(url);
        }

    }

}