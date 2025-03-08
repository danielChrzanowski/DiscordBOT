const random = require('../addons/random.js');

module.exports = {
    name: 'wipetime',
    description: 'Calls for BnS role',

    execute(client, message) {
        const roleName = "BnS";
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (role) {
            const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
            const mentions = membersWithRole.map(member => `<@${member.id}>`).join(" ");

            try {
                const imagesCount = 2;
                const randomImageIndex = random.execute(0, imagesCount - 1);
                let imageName;

                switch (randomImageIndex) {
                    case 0:
                        imageName = 'doge.jpg'
                        break;

                    case 1:
                        imageName = 'doge.jpg'
                        break;
                }

                message.channel.send(`${mentions} It's WIPE TIME! <:catNooo:777774153402679308>`, {
                    files: [`./src/assets/${imageName}`]
                });
            } catch (error) {
                console.log(error);
                client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("Wipe time nie działa :(");
                message.reply("nie ma, bo się obrazek wywalił :(");
            }
        } else {
            message.channel.send(`Nie znaleziono roli o nazwie: ${roleName}`);
        }
    }
}