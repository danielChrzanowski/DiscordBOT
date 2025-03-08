const random = require('./random.js');

module.exports = {
    name: 'dateBotName',
    description: 'Apply date and bot name',

    async execute(client) {
        const botStatuses = [
            { name: "Dzieci Neo", activity: "nagie kwiatki" },
            { name: "Jinx żyje!", activity: "Arcane S2 E9" },
            { name: "MENADŻERKINIA", activity: "stópki Flory" },
            { name: "Jinxie <3", activity: "zdjęcia piesków" }
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
            const { name: botName, activity: botActivity } = botStatuses[randomStatus];

            try {
                client.user.setUsername(botName);
                client.user.setActivity(botActivity, { type: 'WATCHING' });
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