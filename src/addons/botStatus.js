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
            { name: "Najlepszy BOT", activity: "Blade & Soul", type: "PLAYING" },
            { name: "Noob Team", activity: "dźwięki przyrody", type: "LISTENING" }
        ];

        let randomStatus;
        let previousStatus;

        updateBotStatus();
        setInterval(() => {
            updateBotStatus();
        }, 3600000);

        function updateBotStatus() {
            resetRandomStatus();
            setBotUsernameAndActivity();
        }

        function setBotUsernameAndActivity() {
            const { name, activity, type } = botStatuses[randomStatus];

            try {
                client.user.setUsername(name);
                client.user.setActivity(activity, { type });
            } catch (error) {
                console.log(error);
                client.channels.cache.get(process.env.LOG_CHANNEL_ID).send(error);
            };
        }

        function resetRandomStatus() {
            do {
                randomStatus = random.execute(0, botStatuses.length - 1);
            } while (randomStatus === previousStatus);
            previousStatus = randomStatus;
        }
    }
}