module.exports = {
    name: 'server',
    description: 'Prints Destiny 2 twitter link',

    execute(client, message) {
        message.channel.send('https://twitter.com/bungiehelp');
    }

}