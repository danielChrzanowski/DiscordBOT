const globalVariables = require('../addons/globalVariables.js');

module.exports = {
    name: 'nekohelp',
    description: 'Prints parameters for neko',

    execute(client, message) {
        const nekoParameters = globalVariables.execute("nekoParameters");
        message.channel.send(`PARAMETRY NEKO: ${nekoParameters.join(', ')}`);
    }

}