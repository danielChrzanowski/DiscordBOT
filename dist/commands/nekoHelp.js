import globalVariables from '../addons/globalVariables.js';
export default {
    name: 'nekohelp',
    description: 'Prints parameters for neko',
    execute(client, message) {
        const nekoParameters = globalVariables.execute("nekoParameters");
        message.channel.send(`PARAMETRY NEKO: ${nekoParameters.join(', ')}`);
    }
};
