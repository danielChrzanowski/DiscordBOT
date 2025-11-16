import { ActivityOptions, ActivityType, Client, TextChannel } from 'discord.js';
import { getRandom } from './utils.js';

const botActivities: ActivityOptions[] = [
  { name: 'Elden Ring', type: ActivityType.Playing },
  { name: 'Baldurs Gate 3', type: ActivityType.Playing },
  { name: 'Cyberpunk 2077', type: ActivityType.Playing },
  { name: 'Minecraft', type: ActivityType.Playing },
  { name: 'Valorant', type: ActivityType.Playing },
  { name: 'League of Legends', type: ActivityType.Playing },
  { name: 'Starfield', type: ActivityType.Playing },
  { name: 'Palworld', type: ActivityType.Playing },
  { name: 'Helldivers 2', type: ActivityType.Playing },
  { name: 'Fortnite', type: ActivityType.Playing },
  { name: 'Dark Souls 3', type: ActivityType.Playing },
  { name: 'Hollow Knight', type: ActivityType.Playing },
  { name: 'Stardew Valley', type: ActivityType.Playing },
  { name: 'Terraria', type: ActivityType.Playing },
  { name: 'Factorio', type: ActivityType.Playing },
  { name: 'The Witcher 3', type: ActivityType.Playing },
  { name: 'Red Dead 2', type: ActivityType.Playing },
  { name: 'God of War', type: ActivityType.Playing },
  { name: 'Dragon Age Inquisition', type: ActivityType.Playing },
  { name: 'Persona 5', type: ActivityType.Playing },
  { name: 'Zelda Breath of the Wild', type: ActivityType.Playing },
  { name: 'Portal 2', type: ActivityType.Playing },
  { name: 'Half Life 2', type: ActivityType.Playing },
  { name: 'Doom Eternal', type: ActivityType.Playing },
  { name: 'Hades', type: ActivityType.Playing },
  { name: 'Rust', type: ActivityType.Playing },
  { name: 'Pubg', type: ActivityType.Playing },
  { name: 'Apex Legends', type: ActivityType.Playing },
  { name: 'Slay the Spire', type: ActivityType.Playing },
  { name: 'Sekiro Shadows Die Twice', type: ActivityType.Playing },
  { name: 'Dying Light 2', type: ActivityType.Playing },
];

const updateTimeHours = 3;

const initBotActivitiesInterval = (client: Client): void => {
  let currentActivityIndex: number;

  const getRandomActivity = (): ActivityOptions => {
    let randomActivityIndex: number;
    do {
      randomActivityIndex = getRandom(0, botActivities.length - 1);
    } while (randomActivityIndex === currentActivityIndex);
    currentActivityIndex = randomActivityIndex;
    return botActivities[currentActivityIndex];
  };

  const setBotActivity = async () => {
    const activity = getRandomActivity();

    try {
      client.user?.setPresence({ activities: [{ name: `Gra w ${activity.name}`, type: activity.type }] });
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
  };

  setInterval(() => {
    setBotActivity();
  }, 3600000 * updateTimeHours);
};

export default initBotActivitiesInterval;
