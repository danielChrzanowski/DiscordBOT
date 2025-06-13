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
            content: `KOMENDY:\n-cat -> losowy koteł\n-doge -> losowy pieseł\n-summonFox -> przyzywa Foxa\n-summon [użytkownicy] -> przyzywa użytkowników\n-dogeCounter -> twój licznik piesełów\n-dogeCounter [użytkownicy] -> licznik piesełów\n-clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)\n-sleep [użytkownicy] -> kick z głosowego\n-druzynaOgniowa -> woła do Destiny 2 REEE\n-wipeTime -> woła do BnS REEE\n-fun -> fun :)\n-neko <argument> -> losowe neko z parametrem\n-nekoHelp -> parametry do neko\n-ps2 -> populacja PS2 - Miller\n-ps2 <nick> -> statystyki gracza`,
        });
    },
};
