import { ActivityType, Client, TextChannel } from 'discord.js';
import { getRandom } from './utils.js';

type BotStatus = {
  activity: string;
  type: ActivityType;
};

const botStatuses: BotStatus[] = [
  { activity: 'nagie kwiatki', type: ActivityType.Watching },
  { activity: 'Arcane S2 E9', type: ActivityType.Watching },
  { activity: 'stópki Flory', type: ActivityType.Watching },
  { activity: 'zdjęcia piesków', type: ActivityType.Watching },
  { activity: 'TOP 1 DPS', type: ActivityType.Competing },
  { activity: 'Blade & Soul', type: ActivityType.Playing },
  { activity: 'jak trawa rośnie', type: ActivityType.Listening },
  { activity: 'speedrun zmywania naczyń', type: ActivityType.Streaming },
  { activity: 'wyścigu ślimaków', type: ActivityType.Competing },
  { activity: 'koty w cosplayu', type: ActivityType.Watching },
  { activity: 'szant piratów', type: ActivityType.Listening },
  { activity: 'kurs łapania Pokemonów', type: ActivityType.Playing },
  { activity: 'memy o ziemniakach', type: ActivityType.Watching },
  { activity: 'jak pęka popcorn', type: ActivityType.Watching },
  { activity: 'walki na poduszki', type: ActivityType.Competing },
  { activity: 'wędkowanie w kałuży', type: ActivityType.Playing },
  { activity: 'jak schnie farba', type: ActivityType.Listening },
];

const updateTimeHours = 3;

const initBotStatuses = (client: Client): void => {
  let randomStatus: number;
  let previousStatus: number;

  setInterval(() => {
    updateBotStatus();
  }, 3600000 * updateTimeHours);

  function updateBotStatus() {
    resetRandomStatus();
    setBotUsernameAndActivity();
  }

  function resetRandomStatus() {
    do {
      randomStatus = getRandom(0, botStatuses.length - 1);
    } while (randomStatus === previousStatus);
    previousStatus = randomStatus;
  }

  async function setBotUsernameAndActivity() {
    const { activity, type } = botStatuses[randomStatus];

    try {
      client.user?.setActivity(activity, { type });
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
  }
};

export default initBotStatuses;
