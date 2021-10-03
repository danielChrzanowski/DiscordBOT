const random = require('./random.js');
const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'dateBotName',
    description: 'Apply date and bot name',

    async execute(client) {
        var botNameNumber = random.execute(0, 3);
        applyDate();

        async function applyDate() {
            await searchForMinuteStart();
            showDate();

            setInterval(() => {
                showDate();
            }, 60000);
        }

        function searchForMinuteStart() {
            return new Promise((resolve) => {
                setTime = setInterval(() => {
                    date_ob = new Date();
                    let seconds = date_ob.getSeconds();

                    if (seconds == 0) {
                        clearInterval(setTime);
                        resolve();
                    };
                }, 1000);
            });
        }

        function showDate() {
            const currentDate = globalVariables.execute("currentDate");
            client.user.setActivity(currentDate, { type: 'WATCHING' });

            if (globalVariables.execute("fullHour")) changeBotName();
        }

        function changeBotName() {
            try {
                switch (botNameNumber) {
                    case 0:
                        client.user.setUsername("Dzieci Neo");
                        break;

                    case 1:
                        client.user.setUsername("What is life?");
                        break;

                    case 2:
                        client.user.setUsername("Kulka Pog");
                        break;

                    case 3:
                        client.user.setUsername("Weaver OP");
                        break;
                }

                if (botNameNumber < 3) { botNameNumber++; } else { botNameNumber = 0; };
            } catch (error) {
                console.log(error);
                client.channels.cache.get(process.env.LOG_CHANNEL_ID).send(error);
            };
        }
    }
}