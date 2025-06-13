const random = require('./random.js');

module.exports = {
    name: 'dateBotName',
    description: 'Apply date and bot name',

    async execute(client) {
        const botStatuses = [
            { name: "Dzieci Neo", activity: "nagie kwiatki", type: "WATCHING" },
            { name: "Jinx żyje!", activity: "Arcane S2 E9", type: "WATCHING" },
            { name: "MENADŻERKINIA", activity: "stópki Flory", type: "WATCHING" },
            { name: "Jinxie <3", activity: "zdjęcia piesków", type: "WATCHING" },
            { name: "Syn Foxa", activity: "TOP 1 DPS", type: "COMPETING" },
            { name: "What is life?", activity: "Blade & Soul", type: "PLAYING" },
            { name: "Se Pacze", activity: "jak trawa rośnie", type: "LISTENING" }
        ];
        const updateTime = 3600000 * 3;

        let randomStatus;
        let previousStatus;

        setInterval(() => {
            updateBotStatus();
        }, updateTime);

        function updateBotStatus() {
            resetRandomStatus();
            setBotUsernameAndActivity();
        }

        function setBotUsernameAndActivity() {
            const { name, activity, type } = botStatuses[randomStatus];

            (async () => {
                try {
                    client.user.setUsername(name);
                    client.user.setActivity(activity, { type });
                } catch (error) {
                    console.log(error);
                    const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
                    if (logChannel) logChannel.send(error);
                }
            })();
        }

        function resetRandomStatus() {
            do {
                randomStatus = random.execute(0, botStatuses.length - 1);
            } while (randomStatus === previousStatus);
            previousStatus = randomStatus;
        }
    }
}