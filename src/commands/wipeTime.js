const random = require('../addons/random.js');

module.exports = {
    name: 'wipetime',
    description: 'Calls for BnS role',

    execute(client, message) {
        const roleId = '1348017014869987469';

        try {
            const randomImage = `${random.execute(0, 7)}.jpg`;

            message.channel.send({
                content: `<@&${roleId}> It's WIPE TIME! <:catNooo:777774153402679308>`,
                files: [`./src/assets/bns/${randomImage}`]
            });
        } catch (error) {
            console.error(error);

            const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
            if (logChannel) logChannel.send("-wipeTime nie działa :(");

            message.reply("Nie ma, bo się obrazek wywalił :(");
        }
    }
}