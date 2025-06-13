import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';
import getRandom from '../addons/random.js';
import globalVariables from '../addons/globalVariables.js';

const name = 'neko';
const description = 'Prints neko (accepts parameter)';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option =>
        option.setName('parametr')
            .setDescription('Parametr dla API neko (np. safe, explicit, solo, itd.)')
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const parameters = globalVariables.execute('nekoParameters');
        const NSFWParameters = ['explicit'];
        const param = interaction.options.getString('parametr', true);

        if (!parameters.includes(param)) {
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
            const { default: fetch } = await import('node-fetch');
            type NekoApiResponse = { items: { url: string }[] };
            const response = await fetch(`https://api.nekosapi.com/v4/images?${params}`)
                .then(res => res.json() as Promise<NekoApiResponse>);
            if (!response.items || response.items.length === 0) {
                await interaction.editReply('Brak wyników dla tego parametru.');
                return;
            }
            const randomImageIndex = getRandom.execute(0, response.items.length - 1);
            await interaction.editReply(response.items[randomImageIndex].url);
        } catch (error) {
            console.error(error);
            await interaction.editReply('nie ma neko, bo API nie działa, albo podano zły parametr :(');
        }
    },
};