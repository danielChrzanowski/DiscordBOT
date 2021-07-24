module.exports = {
    name: 'help',
    description: 'Prints bot commands',

    execute(client, message) {
        message.channel.send(`KOMENDY:
        -nijjan -> pierwsza prawda objawiona
        -vexi -> druga prawda objawiona
        -play, -skip, -stop -> muzyka
        -cat -> losowy koteł
        -doge -> losowy pieseł
        -clear <ile> -> kasowanie wiadomości (max: 100 wiadomości, 14 dni wstecz)
        -sleep [użytkownicy] -> kick z głosowego
        -server -> status serwera Destiny 2
        -druzynaOgniowa -> woła do gry REEE
        -fun -> fun :)
        -vateusz -> poezja
        -neko [argument] -> losowe neko z parametrem
        -nekoHelp -> parametry do neko
        -ps2 -> populacja PS2 - Miller`);
    }

}