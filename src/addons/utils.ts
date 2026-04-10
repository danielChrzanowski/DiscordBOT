import { ChatInputCommandInteraction, Client, TextChannel, User } from 'discord.js';

const sendMessageToBotLogsChannel = async (client: Client, message: string): Promise<void> => {
  try {
    const logChannelId = process.env.LOG_CHANNEL_ID;
    if (!logChannelId) return;
    const logChannel = await client.channels.fetch(logChannelId);
    if (logChannel && (logChannel as any).send) {
      await (logChannel as any).send(message);
    }
  } catch (err) {
    console.error('Failed to send message to bot logs channel:', err);
  }
};

const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUserOptions = (interaction: ChatInputCommandInteraction, count: number): User[] => {
  return Array.from({ length: count })
    .map((_, i) => interaction.options.getUser(`user${i + 1}`))
    .filter((u): u is User => u !== null);
};

const handleError = async (
  client: Client,
  interaction: ChatInputCommandInteraction,
  error: unknown,
  commandName: string,
  replyForUser: string,
): Promise<void> => {
  try {
    console.error(error);
    await sendMessageToBotLogsChannel(client, `Komenda '${commandName}' nie działa. Error: ${error}`);

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: replyForUser });
    } else {
      await interaction.reply({ content: replyForUser });
    }
  } catch (err) {
    console.error('Error while handling command error:', err);
  }
};

const getChannel = async (interaction: ChatInputCommandInteraction): Promise<TextChannel | null> => {
  const channel = interaction.channel as TextChannel | null;
  if (!channel) {
    await interaction.editReply({ content: 'Nie znaleziono kanału' });
    return null;
  }
  return channel;
};

export { getRandom, sendMessageToBotLogsChannel, getUserOptions, handleError, getChannel };
