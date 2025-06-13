const random = require('../addons/random.js');

module.exports = {
    name: 'druzynaogniowa',
    description: 'Calls for Destiny 2 role',

    async execute(client, message) {
        const roleId = '1348065128117178368';
        const images = ['druzynaOgniowa.png', 'druzynaOgniowa2.png'];

        try {
            const randomImage = images[random.execute(0, images.length - 1)];

            message.channel.send({
                content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
                files: [`./src/assets/destiny/${randomImage}`]
            });
        } catch (error) {
            console.error(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
            if (logChannel) logChannel.send("-druzynaOgniowa nie działa :(");
            message.reply("Nie ma, bo się obrazek wywalił :(");
        }
    }
}