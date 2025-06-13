import random from '../addons/random.js';
import { Client, Message, TextChannel } from 'discord.js';

export default {
    name: 'wipetime',
    description: 'Calls for BnS role',

    async execute(client: Client, message: Message) {
        const roleId = '1348017014869987469';

        try {
            const randomImage = `${random.execute(0, 7)}.jpg`;

            await (message.channel as TextChannel).send({
                content: `<@&${roleId}> It's WIPE TIME! <:catNooo:777774153402679308>`,
                files: [`./src/assets/bns/${randomImage}`]
            });
        } catch (error) {
            console.error(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("-wipeTime nie działa :(");
            message.reply("Nie ma, bo się obrazek wywalił :(");
        }
    }
};
