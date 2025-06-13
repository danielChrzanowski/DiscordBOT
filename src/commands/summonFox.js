module.exports = {
    name: 'summonfox',
    description: 'Summons The Fox',

    async execute(client, message) {
        const { default: fetch } = await import('node-fetch');
        const { EmbedBuilder } = await import('discord.js');

        try {
            const imaginaryFoxId = '<@337220705252802571>';
            let url;

            await fetch('https://randomfox.ca/floof/')
                .then(response => response.json())
                .then(data => url = data.image);

            const embed = new EmbedBuilder()
                .setImage(url)
                .setColor('#e67e22');
            const msg = await message.channel.send({
                content: `Summon ${imaginaryFoxId} <:catNooo:777774153402679308>`,
                embeds: [embed]
            });

            msg.react('<:chibiFox:474699471670738954>');
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("API foxika nie działa :(");
            message.reply("nie ma foxika, bo API nie działa :(");
        }
    }
}
