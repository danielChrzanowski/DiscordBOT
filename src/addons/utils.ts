import { Client } from "discord.js";

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

export { getRandom, sendMessageToBotLogsChannel };

