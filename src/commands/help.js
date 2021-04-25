module.exports = {
    name: 'help',
    description: 'Prints bot commands',

    execute(client, message, args) {
        message.channel.send(`KOMENDY:
        -nijjan -> pierwsza prawda objawiona
        -vexi -> druga prawda objawiona
        -play, -skip, -stop -> muzyka
        -image <nazwa> -> obrazek z neta
        -clear <ile> -> kasowanie wiadomości (max: 20 wiadomości, 14 dni wstecz)
        -sleep [użytkownicy] -> kick z głosowego
        -weapons -> meta broni Destiny 2
        -server -> status serwera Destiny 2
        -druzynaOgniowa -> woła do gry REEE
        -fun -> fun :)`);
    }

}