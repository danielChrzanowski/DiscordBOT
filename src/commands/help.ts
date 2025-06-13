import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const name = 'help';
const description = 'Prints bot commands';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        await interaction.editReply({
            content: `KOMENDY:
            -cat -> losowy koteł
            -doge -> losowy pieseł
            -summonFox -> przyzywa Foxa
            -summon [użytkownicy] -> przyzywa użytkowników
            -dogeCounter -> twój licznik piesełów
            -dogeCounter [użytkownicy] -> licznik piesełów
            -clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)
            -sleep [użytkownicy] -> kick z głosowego
            -druzynaOgniowa -> woła do Destiny 2 REEE
            -wipeTime -> woła do BnS REEE
            -fun -> fun :)
            -neko <argument> -> losowe neko z parametrem
            -nekoHelp -> parametry do neko
            -ps2 -> populacja PS2 - Miller
            -ps2 <nick> -> statystyki gracza`,
        });
    },
};
