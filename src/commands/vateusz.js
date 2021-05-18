module.exports = {
    name: 'vateusz',
    description: 'Prints the poetry',

    async execute(client, message) {
        const reactions = [
            '<:disaSmile:812821278984765490>',
        ];

        const msg = await message.channel.send('**"Szlachetne zdrowie ee eeem prawda ile cię trzeba cenić ' +
            'czy jak a jak tak yy e m m jako smakujesz aż się zepsujesz prawda"** ~Jan Kochanowski' +
            '\nhttps://www.youtube.com/watch?v=FHWbGkpveNk');

        reactions.forEach(element => {
            msg.react(element);
        });
    }

}