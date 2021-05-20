module.exports = {
    name: 'nekohelp',
    description: 'Prints arguments for neko',

    execute(client, message) {
        message.channel.send("https://www.nekos.fun/apidoc.html",{ files: ["./src/assets/nekoCommands.png"] });
    }

}