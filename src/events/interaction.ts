import { Interaction, ChatInputCommandInteraction, Client, Collection } from 'discord.js';

export default async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Użyj Collection zamiast Map
    const client = interaction.client as Client & { commands: Collection<string, any> };
    const command = client.commands?.get(interaction.commandName);

    if (!command || typeof command.executeSlash !== 'function') {
        // Opcjonalnie: odpowiedz użytkownikowi, że komenda nie istnieje
        return;
    }

    try {
        await command.executeSlash(client, interaction as ChatInputCommandInteraction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Wystąpił błąd przy wykonywaniu komendy.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Wystąpił błąd przy wykonywaniu komendy.', ephemeral: true });
        }
    }
};