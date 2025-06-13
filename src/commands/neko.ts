import { ChatInputCommandInteraction, Client, SlashCommandBuilder, TextChannel } from 'discord.js';
import { getRandom, sendMessageToBotLogsChannel } from '../addons/utils.js';

const nekoParameters = ['safe', 'suggestive', 'borderline', 'explicit'];

const name = 'neko';
const description = 'Prints neko';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option =>
        option.setName('parametr')
            .setDescription(nekoParameters.join(', '))
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const NSFWParameters = ['explicit'];
        const param = interaction.options.getString('parametr', true);

        if (!nekoParameters.includes(param)) {
            await interaction.editReply('Podano zły parametr :(');
            return;
        }
        if (NSFWParameters.includes(param) && interaction.channel && !(interaction.channel as TextChannel).nsfw) {
            await interaction.editReply('Możesz użyć tego argumentu tylko na kanale NSFW');
            return;
        }
        try {
            const params = new URLSearchParams();
            params.append('rating', param);
            type NekoApiResponse = { items: { url: string }[] };
            const response = await fetch(`https://api.nekosapi.com/v4/images?${params}`)
                .then(res => res.json() as Promise<NekoApiResponse>);
            if (!response.items || response.items.length === 0) {
                await interaction.editReply('Brak wyników dla tego parametru.');
                return;
            }
            const randomImageIndex = getRandom(0, response.items.length - 1);
            await interaction.editReply(response.items[randomImageIndex].url);
        } catch (error) {
            console.error(error);
            sendMessageToBotLogsChannel(client, `Komenda '${name}' nie działa. Error: ${error}`);

            if (interaction.deferred || interaction.replied) {
                interaction.editReply({ content: 'Nie ma neko, bo API nie działa :(' });
            } else {
                interaction.reply({ content: 'Nie ma neko, bo API nie działa :(' });
            }
        }
    },
};