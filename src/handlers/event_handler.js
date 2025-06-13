const fs = require('fs');

module.exports = (client) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            let event_name = file.split('.')[0];
            if (event_name === 'message') event_name = 'messageCreate';
            client.on(event_name, event.bind(null, client));
        }
    }

    [''].forEach(e => load_dir(e));
}