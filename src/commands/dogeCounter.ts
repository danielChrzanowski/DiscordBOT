import { Client, Message, TextChannel, GuildMember, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('dogecounter')
    .setDescription('Prints dogeCounter')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('User to check doge counter')
            .setRequired(false)
    );

export default {
    name: 'dogecounter',
    description: 'Prints dogeCounter',

    async execute(client: Client, message: Message, args: string[]) {
        const firebase = await import('../firebase/firebaseHandler.js');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const reactions = globalVariables.execute("cuteReactions");
        const targets = message.mentions.members;
        try {
            let msg: Message | undefined;
            if (args.length > 0 && targets && targets.size > 0) {
                for (let [, memberTarget] of targets) {
                    let displayName = (memberTarget as GuildMember).displayName;
                    msg = await message.reply("Doge counter użytkownika \"" + displayName + "\" to: " + await firebase.default.execute("getDogeCounter", memberTarget.user.id, memberTarget.user.username));
                }
            } else {
                msg = await message.reply("Twój doge counter: " + await firebase.default.execute("getDogeCounter", message.author.id, message.author.username));
            }
            if (msg) {
                const i = getRandom.execute(0, reactions.length - 1);
                msg.react(reactions[i]);
            }
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("Baza danych firebase nie działa :(");
            message.reply("podano złe parametry albo baza danych płonie :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        const firebase = await import('../firebase/firebaseHandler.js');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const reactions = globalVariables.execute("cuteReactions");
        const user = interaction.options.getUser('user');
        try {
            let msg;
            if (user) {
                const dogeCount = await firebase.default.execute("getDogeCounter", user.id, user.username);
                msg = await interaction.reply({ content: `Doge counter użytkownika "${user.username}" to: ${dogeCount}` });
            } else {
                const dogeCount = await firebase.default.execute("getDogeCounter", interaction.user.id, interaction.user.username);
                msg = await interaction.reply({ content: `Twój doge counter: ${dogeCount}` });
            }
            // Nie można dodać reakcji do interaction.reply
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Baza danych firebase nie działa :(', ephemeral: true });
        }
    }
};
