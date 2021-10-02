const Discord = require('discord.js');
const dateAvatar = require('./addons/dateAvatar.js');
const client = new Discord.Client();
require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.on('ready', () => {
    client.user.setActivity("Getting current date...", { type: 'WATCHING' });
    dateAvatar.execute(client);
    console.log('Dzieci Neo is online!');
});

client.login(process.env.DISCORD_TOKEN);