import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { getInteractionMentionedUsers, getRandom } from "../addons/utils.js";

const name = 'sleep';
const description = 'Disconnects voice channel users';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option =>
        option.setName('users')
            .setDescription('Users to send to sleep')
            .setRequired(true)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        if (!interaction.memberPermissions?.has('MoveMembers')) {
            await interaction.editReply({ content: 'Nie masz wystarczających uprawnień' });
            return;
        }

        const userIds = getInteractionMentionedUsers(interaction);

        if (userIds.includes('823862166850502657')) {
            await interaction.editReply({ content: 'Jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>' });
            return;
        }

        const guild = interaction.guild;
        if (!guild) {
            await interaction.editReply({ content: 'Nie można znaleźć gildii.' });
            return;
        }

        const msgs: string[] = [];
        for (const userId of userIds) {
            try {
                const memberTarget = await guild.members.fetch(userId);
                const mention = `<@${userId}>`;

                if (memberTarget.voice && memberTarget.voice.channelId) {
                    const rand = getRandom(0, 3);
                    let msg = '';

                    switch (rand) {
                        case 0:
                            msg = `${mention}, milusia kołderka <:pupperSleep:788211096481562654>`;
                            break;
                        case 1:
                            msg = `${mention}, do spania dziecko drogie <:dogeSleep:781255974077464636>`;
                            break;
                        case 2:
                            msg = `${mention}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`;
                            break;
                    }

                    msgs.push(msg);
                    await memberTarget.voice.setChannel(null);
                } else {
                    msgs.push(`Chill mon <:catGun:790433695998935090>. ${mention} już śpi :sleeping:`);
                }
            } catch {
                msgs.push(`Nie można znaleźć użytkownika o ID ${userId}`);
            }
        }

        if (msgs.length === 0) {
            interaction.editReply({ content: 'Nie podałeś żadnych użytkowników do uspania' });
            return;
        }

        interaction.editReply({ content: msgs.join('\n') });
    }
};
