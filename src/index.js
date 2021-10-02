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
    client.user.setUsername("MyNewUsername");
    client.user.setActivity("Getting current date...", { type: 'WATCHING' });
    applyDate();
});

client.login(process.env.DISCORD_TOKEN);

async function applyDate() {
    await searchForMinuteStart();
    showDate();

    setInterval(() => {
        showDate();
    }, 5000);
}

function showDate() {
    date_ob = new Date();
    let hours = (date_ob.getHours() < 10 ? '0' : '') + date_ob.getHours();
    let minutes = (date_ob.getMinutes() < 10 ? '0' : '') + date_ob.getMinutes();
    let day = (date_ob.getDate() < 10 ? '0' : '') + date_ob.getDate();
    let month = ((date_ob.getMonth() + 1) < 10 ? '0' : '') + (date_ob.getMonth() + 1);
    let year = date_ob.getFullYear();

    var currentTime = hours + ":" + minutes + " | " + day + "-" + month + "-" + year;
    client.user.setActivity(currentTime, { type: 'WATCHING' });
}

function searchForMinuteStart() {
    return new Promise((resolve) => {
        setTime = setInterval(() => {
            date_ob = new Date();
            let seconds = date_ob.getSeconds();

            if (seconds == 0) {
                clearInterval(setTime);
                resolve();
            };
        }, 1000);
    });
}