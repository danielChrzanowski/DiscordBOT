const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.on('ready', () => {
    console.log('Dzieci Neo is online!');
    client.user.setActivity('Weaver OP');
});

client.login(process.env.DISCORD_TOKEN);
