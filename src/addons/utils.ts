import { ChatInputCommandInteraction, Client, User } from "discord.js";

let lastSleepResponseIndex = -1;

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

const getUserOptions = (interaction: ChatInputCommandInteraction, count: number): User[] => {
    return Array.from({ length: count })
        .map((_, i) => interaction.options.getUser(`user${i + 1}`))
        .filter((u): u is User => u !== null);
}

const getRandomSleepResponse = (mention: string): string => {
    const responses = [
        `${mention}, milusia kołderka <:pupperSleep:788211096481562654>`,
        `${mention}, do spania dziecko drogie <:dogeSleep:781255974077464636>`,
        `${mention}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`,
    ];

    let index: number;
    do {
        index = getRandom(0, responses.length - 1);
    } while (index === lastSleepResponseIndex);
    lastSleepResponseIndex = index;
    return responses[index];
};

export { getRandom, sendMessageToBotLogsChannel, getUserOptions, getRandomSleepResponse };
