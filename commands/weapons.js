module.exports = {
    name: 'weapons',
    description: 'Prints Destiny 2 weapons link',

    execute(client, message, args) {
        message.channel.send('https://destinytracker.com/destiny-2/db/insights');
    }

}