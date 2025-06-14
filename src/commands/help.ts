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
            -clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)
            -dogeCounter [użytkownicy] -> licznik piesełów (opcjonalnie można podać użytkowników)
            -doge -> losowy pieseł
            -druzynaOgniowa -> woła Drużynę Ogniową REEE
            -fun -> fun :)
            -neko <argument> -> losowe neko z parametrem
            -ps2 [nick] -> populacja PS2 - Miller lub statystyki gracza (jeśli podasz nick w parametrze)
            -summonFox -> przyzywa Foxa
            -summon <użytkownicy> -> przyzywa użytkowników
            -sleep <użytkownicy> -> kick z głosowego
            -wipeTime -> woła do BnS REEE`,
        });
    },
};
