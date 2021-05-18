const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client, message) {
        const { file } = await fetch('https://aws.random.cat/meow')
            .then(response => response.json());

        message.channel.send(file);
    }

}