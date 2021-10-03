module.exports = {
    name: 'druzynaogniowa',
    description: 'Calls for @Nijjan @Vexi @Tomektowy',

    execute(client, message) {
        try {
            message.channel.send(`<@297069936109682698> <@722865266777915432> <@375759744943521792>\nGramy w gre REEEEEE <:catNooo:777774153402679308>`,
                { files: ["./src/assets/druzynaOgniowa2.png"] });
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\nDrużyna ogniowa nie działa :(\n" + globalVariables.execute("currentDate"));
            message.reply("nie ma, bo sie obrazek wywalił :(");
        }
    }

}