import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const name = 'dogecounter';
const description = 'Prints dogeCounter';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addUserOption(option =>
        option.setName('user')
            .setDescription('User to check doge counter')
            .setRequired(false)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const firebase = await import('../firebase/firebaseHandler.js');
        const { default: getRandom } = await import('../addons/random.js');
        const { default: globalVariables } = await import('../addons/globalVariables.js');
        const reactions = globalVariables.execute("cuteReactions");
        const user = interaction.options.getUser('user');
        try {
            if (user) {
                const dogeCount = await firebase.default.execute("getDogeCounter", user.id, user.username);
                await interaction.editReply({ content: `Doge counter użytkownika "${user.username}" to: ${dogeCount}` });
            } else {
                const dogeCount = await firebase.default.execute("getDogeCounter", interaction.user.id, interaction.user.username);
                await interaction.editReply({ content: `Twój doge counter: ${dogeCount}` });
            }
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as any).send) (logChannel as any).send("Baza danych firebase nie działa :(");
            await interaction.editReply({ content: "podano złe parametry albo baza danych płonie :(" });
        }
    },
};
