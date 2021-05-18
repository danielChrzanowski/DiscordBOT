module.exports = {
    name: 'nekohelp',
    description: 'Prints arguments for neko',

    execute(client, message) {
        message.channel.send({ files: ["./src/assets/nekoCommands.png"] });
    }

}