import { Interaction, ChatInputCommandInteraction, Client } from 'discord.js';

export default async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Upewnij się, że client.commands istnieje i jest typu Collection
    const client = interaction.client as Client & { commands: Map<string, any> };
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