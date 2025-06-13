import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


export const slash = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Prints bot commands');

export default {
    name: 'help',
    description: 'Prints bot commands',

    execute(client: Client, message: Message) {
        (message.channel as TextChannel).send(`KOMENDY:
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
        -ps2 <nick> -> statystyki gracza`);
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        await interaction.editReply({
            content: `KOMENDY:\n-cat -> losowy koteł\n-doge -> losowy pieseł\n-summonFox -> przyzywa Foxa\n-summon [użytkownicy] -> przyzywa użytkowników\n-dogeCounter -> twój licznik piesełów\n-dogeCounter [użytkownicy] -> licznik piesełów\n-clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)\n-sleep [użytkownicy] -> kick z głosowego\n-druzynaOgniowa -> woła do Destiny 2 REEE\n-wipeTime -> woła do BnS REEE\n-fun -> fun :)\n-neko <argument> -> losowe neko z parametrem\n-nekoHelp -> parametry do neko\n-ps2 -> populacja PS2 - Miller\n-ps2 <nick> -> statystyki gracza`,
        });
    }
};
