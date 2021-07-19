const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client, message) {
        /*
        const { file } = await fetch('https://aws.random.cat/meow')
            .then(response => response.json());
        
        message.channel.send(file);
        */

        fetch('https://api.thecatapi.com/v1/images/search?format=json', {
            headers: { 'x-api-key': process.env.DISCORD_TOKEN, }
        }).then(function (response) { return response.json(); })
            .then(data => { message.channel.send(data[0].url); });
    }

}
