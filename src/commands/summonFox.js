const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'summonfox',
    description: 'Summons The Fox',

    async execute(client, message) {
        try {
            const imaginaryFoxId = '<@337220705252802571>';
            let url;

            await fetch('https://randomfox.ca/floof/')
                .then(response => response.json())
                .then(data => url = data.image);

            const embed = new Discord.MessageEmbed()
                .setImage(url)
                .setColor('#e67e22');
            const msg = await message.channel.send(
                `Summon ${imaginaryFoxId} <:catNooo:777774153402679308>`,
                embed
            );

            msg.react('<:chibiFox:474699471670738954>');
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("API foxika nie działa :(");
            message.reply("nie ma foxika, bo API nie działa :(");
        }
    }
}
