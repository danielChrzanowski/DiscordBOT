const fetch = require('node-fetch');

module.exports = {
    name: 'neko',
    description: 'Prints neko with parameter',

    async execute(client, message, args) {
        if (!args.length) return message.reply('musisz podać agrument');

        const { image } = await fetch('http://api.nekos.fun:8080/api/' + args[0])
            .then(response => response.json());

        message.channel.send(image);
    }

}