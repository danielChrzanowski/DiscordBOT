export default {
    name: 'fun',
    description: 'Shows fun photo',
    async execute(client, message) {
        try {
            await message.channel.send({
                content: `Fun <:uganda:783095652212670514>`,
                files: ["./src/assets/destiny/fun.png"]
            });
        }
        catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
            if (logChannel && logChannel.send)
                logChannel.send("Fun nie działa :(");
            message.reply("nie ma, bo sie obrazek wywalił :(");
        }
    }
};
