module.exports = {
    name: 'fun',
    description: 'Shows fun photo',

    execute(client, message) {
        try {
            message.channel.send(`Fun <:uganda:783095652212670514>`,
                { files: ["./src/assets/destiny/fun.png"] });
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("Fun nie działa :(");
            message.reply("nie ma, bo sie obrazek wywalił :(");
        }
    }

}