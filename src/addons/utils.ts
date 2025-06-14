import { ChatInputCommandInteraction, Client } from "discord.js";

const sendMessageToBotLogsChannel = async (client: Client, message: string) => {
    const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
    if (logChannel && (logChannel as any).send) {
        (logChannel as any).send(message);
    }
}

const getRandom = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getInteractionMentionedUsers = (interaction: ChatInputCommandInteraction): string[] => {
    const input = interaction.options.getString('users')!;
    const mentions = input.match(/<@!?(\d+)>/g) ?? [];

    const userIds = mentions
        .map(m => {
            const match = m.match(/\d+/);
            return match ? match[0] : null;
        })
        .filter((id): id is string => id !== null);

    return userIds;
};

export { getRandom, sendMessageToBotLogsChannel, getInteractionMentionedUsers };

