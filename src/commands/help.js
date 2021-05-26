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
        -clear <ile> -> kasowanie wiadomości (max: 20 wiadomości, 14 dni wstecz)
        -sleep [użytkownicy] -> kick z głosowego
        -server -> status serwera Destiny 2
        -druzynaOgniowa -> woła do gry REEE
        -fun -> fun :)
        -vateusz -> poezja
        -neko [argument] -> losowe neko z argumentem
        -nekoHelp -> argumenty do neko
        -poland -> Gdyby Polska miała trailer`);
    }

}