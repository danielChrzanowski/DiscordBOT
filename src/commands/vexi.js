module.exports = {
    name: 'vexi',
    description: 'Prints the 2nd truth',

    execute(client, message, args) {
        const reactions = [
            '<:shinoSmirk:474697613027966998>',
            '<:z18:470737705937141772>',
            '<:pupperBless:781254877682729001>',
            '<:peepoWOOpantsu:474699651661168661>',
            '<:eosGasm:474698689772912640>',
            '<:disaSmile:812821278984765490>',
            '<:bnsPlease:468750180779294751>',
            '<:catJuice:790433770092101672>'
        ];

        reactions.forEach(element => {
            message.react(element);
        });

        message.channel.send('Vexi to TOP 1 HEAL TRAITOR EU');
    }

}