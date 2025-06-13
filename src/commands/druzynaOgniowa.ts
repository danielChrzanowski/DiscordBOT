import random from '../addons/random.js';
import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('druzynaogniowa')
    .setDescription('Calls for Destiny 2 role');

export default {
    name: 'druzynaogniowa',
    description: 'Calls for Destiny 2 role',

    async execute(client: Client, message: Message) {
        const roleId = '1348065128117178368';
        const images = ['druzynaOgniowa.png', 'druzynaOgniowa2.png'];
        try {
            const randomImage = images[random.execute(0, images.length - 1)];
            await (message.channel as TextChannel).send({
                content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
                files: [`./src/assets/destiny/${randomImage}`]
            });
        } catch (error) {
            console.error(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("-druzynaOgniowa nie działa :(");
            message.reply("Nie ma, bo się obrazek wywalił :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        const roleId = '1348065128117178368';
        const images = ['druzynaOgniowa.png', 'druzynaOgniowa2.png'];
        try {
            const randomImage = images[random.execute(0, images.length - 1)];
            await interaction.reply({
                content: `<@&${roleId}> Gramy w grę REEEEEE <:catNooo:777774153402679308>`,
                files: [`./src/assets/destiny/${randomImage}`]
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '-druzynaOgniowa nie działa :(', ephemeral: true });
        }
    }
};
