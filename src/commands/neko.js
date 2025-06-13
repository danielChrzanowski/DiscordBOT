module.exports = {
    name: 'neko',
    description: 'Prints neko (accepts parameter)',

    async execute(client, message, args) {
        const { default: fetch } = await import('node-fetch');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const nekoHelp = await import('./nekoHelp.js');
        const parameters = globalVariables.execute('nekoParameters');
        const NSWParameters = ['explicit'];

        if (args.length < 1) {
            message.reply('musisz podać parametr');
            return nekoHelp.execute(client, message);
        }

        if (args[0]) {
            const correctParameter = parameters.some(element => element === args[0]);
            if (!correctParameter) {
                message.reply('Podano zły parametr :(');
                return nekoHelp.execute(client, message);
            }

            const NSW = NSWParameters.includes(args[0]) && !message.channel.nsfw;
            if (NSW) return message.reply('możesz użyć tego argumentu tylko na kanale NSFW');

        }

        try {
            const params = new URLSearchParams();
            if (args[0]) {
                params.append("rating", args[0]);
            }

            const response = await fetch(`https://api.nekosapi.com/v4/images?${params}`)
                .then(response => response.json());

            const randomImageIndex = getRandom.execute(0, response.items.length - 1);
            const msg = await message.channel.send(response.items[randomImageIndex].url);

            const reactions = globalVariables.execute("nekoReactions");
            const randomReactionIndex = getRandom.execute(0, reactions.length - 1);
            return msg.react(reactions[randomReactionIndex]);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("API neko nie działa :(");
            message.reply("nie ma neko, bo API nie działa, albo podano zły parametr :(");
            return nekoHelp.execute(client, message);
        }
    }
}