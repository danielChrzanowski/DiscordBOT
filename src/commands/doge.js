const fetch = require('node-fetch');

module.exports = {
    name: 'doge',
    description: 'Prints random doge',

    async execute(client, message) {
        const { url } = await fetch('https://random.dog/woof.json')
            .then(response => response.json());

        message.channel.send(url);
    }

}