import random from './random.js';
import { Client, ActivityType, TextChannel } from 'discord.js';

const botStatuses = [
    { name: 'Dzieci Neo', activity: 'nagie kwiatki', type: ActivityType.Watching },
    { name: 'Jinx żyje!', activity: 'Arcane S2 E9', type: ActivityType.Watching },
    { name: 'MENADŻERKINIA', activity: 'stópki Flory', type: ActivityType.Watching },
    { name: 'Jinxie <3', activity: 'zdjęcia piesków', type: ActivityType.Watching },
    { name: 'Syn Foxa', activity: 'TOP 1 DPS', type: ActivityType.Competing },
    { name: 'What is life?', activity: 'Blade & Soul', type: ActivityType.Playing },
    { name: 'Se Pacze', activity: 'jak trawa rośnie', type: ActivityType.Listening },
];

const updateTime = 3600000 * 3;

export default {
    name: 'dateBotName',
    description: 'Apply date and bot name',

    async execute(client: Client) {
        let randomStatus: number;
        let previousStatus: number | undefined;

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
                    await client.user?.setUsername(name);
                    await client.user?.setActivity(activity, { type });
                } catch (error) {
                    console.log(error);
                    try {
                        const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID || '');
                        if (logChannel && logChannel.isTextBased()) {
                            (logChannel as TextChannel).send(String(error));
                        }
                    } catch (e) {
                        console.log('Failed to send error to log channel:', e);
                    }
                }
            })();
        }

        function resetRandomStatus() {
            do {
                randomStatus = random.execute(0, botStatuses.length - 1);
            } while (randomStatus === previousStatus);
            previousStatus = randomStatus;
        }
    },
};
