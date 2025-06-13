import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const name = 'fun';
const description = 'Shows fun photo';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        try {
            await interaction.editReply({
                content: `Fun <:uganda:783095652212670514>`,
                files: ["./src/assets/destiny/fun.png"]
            });
        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: 'Fun nie działa :(' });
        }
    },
};
