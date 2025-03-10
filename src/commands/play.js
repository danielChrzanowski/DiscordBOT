const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    description: 'Plays music',
    aliases: ['skip', 'stop'],
    cooldown: 0,

    async execute(client, message, args, cmd, Discord) {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.reply('musisz być na kanale głosowym, żeby włączyć/wyłączyć muzykę');
        if (!message.member.hasPermission("CONNECT")) return message.reply('nie masz wystarczających uprawnień');
        if (!message.member.hasPermission("SPEAK")) return message.reply('nie masz wystarczających uprawnień');

        try {
            const server_queue = queue.get(message.guild.id);

            if (cmd === 'play') {
                if (!args.length) return message.reply('musisz podać nazwę lub link do YT');
                let song = {};

                if (ytdl.validateURL(args[0])) {
                    const song_info = await ytdl.getInfo(args[0]);
                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }

                } else {
                    const video_finder = async (query) => {
                        const video_result = await ytSearch(query);
                        return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                    }

                    const video = await video_finder(args.join(' '));
                    if (video) {
                        song = { title: video.title, url: video.url }

                    } else {
                        message.reply('błąd przy przeszukiwaniu YT D:');
                    }
                }

                if (!server_queue) {
                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }

                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);

                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        video_player(message.guild, queue_constructor.songs[0]);

                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.reply('wystąpił problem z połączeniem');
                        throw err;
                    }

                } else {
                    server_queue.songs.push(song);
                    return message.channel.send(`-------------------------------\nDodano do kolejki: **${song.title}**`);
                }
            } else if (cmd === 'skip') skip_song(message, server_queue);
            else if (cmd === 'stop') stop_song(message, server_queue);
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("Muzyka nie działa :(");
            message.reply("muzyka nie działa, bo API nie działa :(");
        }
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 1 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });

    await song_queue.text_channel.send(`-------------------------------\nTeraz grane: ${song.url}`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.reply('musisz być na kanale głosowym, żeby skipować muzykę');
    if (!server_queue) {
        return message.reply(`Kolejka jest pusta`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.reply('musisz być na kanale głosowym, żeby stopować muzykę');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}
