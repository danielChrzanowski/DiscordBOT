import { MessageFlags } from 'discord-api-types/v10';
import { Interaction, ChatInputCommandInteraction, Client, Collection } from 'discord.js';

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
      try {
        console.warn('Cannot respond to interaction: Unknown interaction (10062).', {
          interactionId: (interaction as any)?.id,
          userId: (interaction as any)?.user?.id,
          command: (interaction as any)?.commandName,
          pid: process.pid,
        });
      } catch (_logErr) {
        console.warn('Cannot respond to interaction: Unknown interaction (10062).');
      }
      return;
    }

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error running the command',
          flags: Number(MessageFlags.Ephemeral),
        });
      } else {
        await interaction.reply({
          content: 'There was an error running the command',
          flags: Number(MessageFlags.Ephemeral),
        });
      }
    } catch (replyErr) {
      console.error('Failed sending error message to interaction:', replyErr);
    }
  }
};
