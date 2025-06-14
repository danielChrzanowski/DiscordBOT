import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (client: Client) => {
    const eventsPath = path.join(__dirname, '../handlers');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        import(pathToFileURL(filePath).href).then(eventModule => {
            let eventName = file.split('.')[0];
            if (eventName === 'message') eventName = 'messageCreate';
            const event = eventModule.default || eventModule;
            if (typeof event === 'function') {
                client.on(eventName, event);
            } else {
                console.error(`Event ${file} does not export a function!`);
            }
        }).catch(err => {
            console.error(`Failed to load event ${file}:`, err);
        });
    }
};