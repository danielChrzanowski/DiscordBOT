import { Interaction, ChatInputCommandInteraction, Client, Collection } from 'discord.js';

export default async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

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
            await interaction.followUp({ content: 'There was an error running the command', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error running the command', ephemeral: true });
        }
    }
};