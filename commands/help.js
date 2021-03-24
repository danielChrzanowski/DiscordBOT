module.exports = {
    name: 'help',

    execute(client, message, args) {
        message.channel.send(`KOMENDY:
        -nijjan -> prawda objawiona
        -play, -stop -> muzyka
        -image <arg> -> obrazek z neta
        -clear <arg> -> kasowanie wiadomości (max 20)
        -kick [args] -> kick z głosowego
        -bronie -> meta broni Destiny 2
        -server -> status serwera Destiny 2`);
    }

}