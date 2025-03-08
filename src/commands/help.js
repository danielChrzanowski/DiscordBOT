module.exports = {
    name: 'help',
    description: 'Prints bot commands',

    execute(client, message) {
        message.channel.send(`KOMENDY:
        -play, -skip, -stop -> muzyka
        -cat -> losowy koteł
        -doge -> losowy pieseł
        -dogeCounter -> twój licznik piesełów
        -dogeCounter [użytkownicy] -> licznik piesełów
        -clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)
        -sleep [użytkownicy] -> kick z głosowego
        -druzynaOgniowa -> woła do Destiny 2 REEE
        -wipeTime -> woła do BnS REEE
        -fun -> fun :)
        -neko -> losowe neko
        -neko <argument> -> losowe neko z parametrem
        -nekoHelp -> parametry do neko
        -ps2 -> populacja PS2 - Miller
        -ps2 <nick> -> statystyki gracza`);
    }
}