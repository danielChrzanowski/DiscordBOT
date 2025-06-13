import random from '../addons/random.js';
import globalVariables from '../addons/globalVariables.js';
export default {
    name: 'summon',
    description: 'Summons tagged users',
    async execute(client, message) {
        const reactions = globalVariables.execute("cuteReactions");
        const usersToMention = message.mentions.users;
        if (usersToMention.size === 0) {
            return message.reply("Musisz oznaczyć przynajmniej jednego użytkownika, np. `-summon @Janek @Kasia`");
        }
        const repeatCount = 4;
        for (const [, user] of usersToMention) {
            const mention = `<@${user.id}>`;
            let lastIndex = -1;
            for (let i = 0; i < repeatCount; i++) {
                let newIndex;
                do {
                    newIndex = random.execute(0, reactions.length - 1);
                } while (newIndex === lastIndex && reactions.length > 1);
                lastIndex = newIndex;
                await message.channel.send(`Summon ${mention} ${reactions[newIndex]}`);
            }
        }
    }
};
