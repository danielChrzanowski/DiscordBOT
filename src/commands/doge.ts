import { Client, Message, TextChannel } from 'discord.js';

export default {
    name: 'doge',
    description: 'Prints random doge',

    async execute(client: Client, message: Message) {
        const { default: fetch } = await import('node-fetch');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const firebase = await import('../firebase/firebaseHandler.js');
        const reactions = globalVariables.execute("cuteReactions");
        try {
            const { url } = await fetch('https://random.dog/woof.json').then((response: any) => response.json());
            const msg = await (message.channel as TextChannel).send(url);
            const i = getRandom.execute(0, reactions.length - 1);
            msg.react(reactions[i]);
            await firebase.default.execute("setDogeCounter", message.author.id, message.author.username);
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("API pieseła nie działa :(");
            message.reply("nie ma pieseła, bo API nie działa :(");
        }
    }
};
