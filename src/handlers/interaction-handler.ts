import { Interaction, ChatInputCommandInteraction, Client, Collection, InteractionResponseFlags } from 'discord.js';

export default async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const client = interaction.client as Client & {
    commands: Collection<string, any>;
  };
  const command = client.commands?.get(interaction.commandName);
  if (!command) {
    console.warn(`No command registered for ${interaction.commandName}`);
    return;
  }

  if (typeof command.executeSlash !== 'function') {
    console.warn(`Command ${interaction.commandName} has no executeSlash function`);
    return;
  }

  try {
    await command.executeSlash(client, interaction as ChatInputCommandInteraction);
  } catch (error) {
    console.error(error);

    const errAny = error as any;
    const code = errAny?.code ?? errAny?.rawError?.code;
    if (code === 10062) {
      console.warn('Cannot respond to interaction: Unknown interaction (10062).');
      return;
    }

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error running the command',
          flags: InteractionResponseFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: 'There was an error running the command',
          flags: InteractionResponseFlags.Ephemeral,
        });
      }
    } catch (replyErr) {
      console.error('Failed sending error message to interaction:', replyErr);
    }
  }
};
