import { ChatInputCommandInteraction, Client, User } from "discord.js";

const sendMessageToBotLogsChannel = async (client: Client, message: string) => {
  const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
  if (logChannel && (logChannel as any).send) {
    (logChannel as any).send(message);
  }
};

const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUserOptions = (
  interaction: ChatInputCommandInteraction,
  count: number
): User[] => {
  return Array.from({ length: count })
    .map((_, i) => interaction.options.getUser(`user${i + 1}`))
    .filter((u): u is User => u !== null);
};

const handleError = (
  client: Client,
  interaction: ChatInputCommandInteraction,
  error: unknown,
  commandName: string,
  replyForUser: string
): void => {
  console.error(error);
  sendMessageToBotLogsChannel(
    client,
    `Komenda '${commandName}' nie działa. Error: ${error}`
  );

  if (interaction.deferred || interaction.replied) {
    interaction.editReply({ content: replyForUser });
  } else {
    interaction.reply({ content: replyForUser });
  }
};

export { getRandom, sendMessageToBotLogsChannel, getUserOptions, handleError };
