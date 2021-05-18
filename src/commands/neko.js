const fetch = require('node-fetch');

module.exports = {
    name: 'neko',
    description: 'Prints neko with parameter',

    async execute(client, message, args) {
        if (!args.length) return message.reply('musisz podać agrument');

        tags = ['4k', 'ass', 'blowjob', 'bj', 'boobs', 'cum', 'feet',
            'hentai', 'wallpapers', 'spank', 'gasm', 'lesbian', 'lewd', 'pussy'];

        for (i of tags) {
            if (i == args[0]) {
                if (!message.channel.nsfw)
                    return message.reply('możesz użyć tego argumentu tylko na kanale NSFW');
            }
        }

        const { image } = await fetch('http://api.nekos.fun:8080/api/' + args[0])
            .then(response => response.json());

        message.channel.send(image);
    }

}