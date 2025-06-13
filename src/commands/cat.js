module.exports = {
    name: 'cat',
    description: 'Prints random cat',

    async execute(client, message) {
        const { default: fetch } = await import('node-fetch');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const reactions = globalVariables.execute("cuteReactions");

        try {
            fetch('https://api.thecatapi.com/v1/images/search?format=json', {
                headers: { 'x-api-key': process.env.THE_CAT_API_KEY }
            }).then(function (response) { return response.json(); })
                .then(async data => {
                    const msg = await message.channel.send(data[0].url);

                    const i = getRandom.execute(0, reactions.length - 1);
                    msg.react(reactions[i]);
                });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
            if (logChannel) logChannel.send("API koteła nie działa :(");
            message.reply("nie ma koteła, bo API nie działa :(");
        }
    }
}