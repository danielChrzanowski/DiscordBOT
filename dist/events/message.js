const PREFIX = process.env.PREFIX || '-';
export default async (message) => {
    console.log('Odebrano wiadomość:', message.content);
    console.log('Aktualny prefix:', PREFIX);
    if (message.author.bot || !message.content.startsWith(PREFIX)) {
        console.log('Wiadomość od bota lub bez prefixu, pomijam.');
        return;
    }
    console.log('Wiadomość z prefixem:', message.content);
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    console.log('Args:', args);
    const commandName = args.shift()?.toLowerCase();
    console.log('Rozpoznana komenda:', commandName);
    // Używamy message.client, bo klient jest zawsze dostępny w Message
    const client = message.client;
    if (!commandName || commandName.length === 0) {
        const commands = Array.from(client.commands.values());
        const commandList = commands.map((cmd) => `-${cmd.name} -> ${cmd.description || ''}`).join('\n');
        message.channel.send(`Dostępne komendy:\n${commandList}`);
        console.log('Wyświetlono listę komend.');
        return;
    }
    const command = client.commands.get(commandName);
    console.log('Znaleziono komendę:', command?.name);
    if (!command) {
        console.log('Nie znaleziono komendy:', commandName);
        return;
    }
    try {
        await command.execute(client, message, args);
        console.log('Wykonano komendę:', commandName);
    }
    catch (error) {
        console.error(error);
        message.channel.send('Wystąpił błąd przy wykonywaniu komendy.');
    }
};
