import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('fun')
    .setDescription('Shows fun photo');

export default {
    name: 'fun',
    description: 'Shows fun photo',

    async execute(client: Client, message: Message) {
        try {
            await (message.channel as TextChannel).send({
                content: `Fun <:uganda:783095652212670514>`,
                files: ["./src/assets/destiny/fun.png"]
            });
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as TextChannel).send) (logChannel as TextChannel).send("Fun nie działa :(");
            message.reply("nie ma, bo sie obrazek wywalił :(");
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        try {
            await interaction.reply({
                content: `Fun <:uganda:783095652212670514>`,
                files: ["./src/assets/destiny/fun.png"]
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Fun nie działa :(', ephemeral: true });
        }
    }
};
