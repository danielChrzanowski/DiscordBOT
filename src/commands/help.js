module.exports = {
    name: 'help',
    description: 'Prints bot commands',

    execute(client, message) {
        message.channel.send(`KOMENDY:
        -play, -skip, -stop -> muzyka
        -cat -> losowy koteł
        -doge -> losowy pieseł
        -dogeCounter -> twój licznik piesełów
        -clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)
        -sleep [użytkownicy] -> kick z głosowego
        -druzynaOgniowa -> woła do gry REEE
        -fun -> fun :)
        -neko [argument] -> losowe neko z parametrem
        -nekoHelp -> parametry do neko
        -ps2 <nick> -> populacja PS2 - Miller <statystyki gracza>
        -covid -> nowe potwierdzone przypadki covid-19 w Polsce`);
    }
}