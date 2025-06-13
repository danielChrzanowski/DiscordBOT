import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import random from '../addons/random.js';
const name = 'wipetime';
const description = 'Calls for BnS role';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const roleId = '1348017014869987469';
        try {
            const randomImage = `${random.execute(0, 7)}.jpg`;
            await interaction.editReply({
                content: `<@&${roleId}> It's WIPE TIME! <:catNooo:777774153402679308>`,
                files: [{ attachment: `./src/assets/bns/${randomImage}` }]
            });
        } catch (error) {
            console.error(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as any).send) (logChannel as any).send("-wipeTime nie działa :(");
            await interaction.editReply({ content: "Nie ma, bo się obrazek wywalił :(" });
        }
    },
};
