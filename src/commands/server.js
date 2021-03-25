module.exports = {
    name: 'server',
    description: 'Prints Destiny 2 twitter link',

    execute(client, message, args) {
        message.channel.send('https://twitter.com/bungiehelp');
    }

}