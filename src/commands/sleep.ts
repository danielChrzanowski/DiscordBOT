import { Client, Message, TextChannel, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slash = new SlashCommandBuilder()
    .setName('sleep')
    .setDescription('Disconnects voice channel users')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('Użytkownik do uspania')
            .setRequired(false)
    );

export default {
    name: 'sleep',
    description: 'Disconnects voice channel users',

    async execute(client: Client, message: Message, args: string[]) {
        if (!args.length) return message.reply('musisz podać użytkowników do uspania');
        if (!message.member?.permissions.has('MoveMembers')) return message.reply('Nie masz wystarczających uprawnień');

        const targets = message.mentions.users;
        let rand: number;

        if (targets) {
            for (const user of targets.values()) {
                if (user.id == '823862166850502657') {
                    message.reply('jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>');
                } else {
                    if (!message.guild) {
                        message.reply('Nie można znaleźć gildii.');
                        continue;
                    }
                    let memberTarget = await message.guild.members.fetch(user.id);
                    if (memberTarget.voice && memberTarget.voice.channelId) {
                        rand = getRandomInt(0, 3);
                        switch (rand) {
                            case 0:
                                (message.channel as TextChannel).send(`${user}, milusia kołderka <:pupperSleep:788211096481562654>`);
                                break;
                            case 1:
                                (message.channel as TextChannel).send(`${user}, do spania dziecko drogie <:dogeSleep:781255974077464636>`);
                                break;
                            case 2:
                                (message.channel as TextChannel).send(`${user}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`);
                                break;
                        }
                        memberTarget.voice.setChannel(null);
                    } else {
                        message.reply(`chill mon <:catGun:790433695998935090>. ${user} już śpi :sleeping:`);
                    }
                }
            }
        }
    },

    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        if (!interaction.memberPermissions?.has('MoveMembers')) {
            await interaction.editReply({ content: 'Nie masz wystarczających uprawnień' });
            return;
        }
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.reply({ content: 'Musisz podać użytkownika do uspania', ephemeral: true });
            return;
        }
        if (user.id == '823862166850502657') {
            await interaction.reply({ content: 'jak śmiesz próbować mnie kickować <:pathetic:776129039688663061>', ephemeral: true });
            return;
        }
        const guild = interaction.guild;
        if (!guild) {
            await interaction.reply({ content: 'Nie można znaleźć gildii.', ephemeral: true });
            return;
        }
        let memberTarget = await guild.members.fetch(user.id);
        if (memberTarget.voice && memberTarget.voice.channelId) {
            const rand = getRandomInt(0, 3);
            let msg = '';
            switch (rand) {
                case 0:
                    msg = `${user}, milusia kołderka <:pupperSleep:788211096481562654>`;
                    break;
                case 1:
                    msg = `${user}, do spania dziecko drogie <:dogeSleep:781255974077464636>`;
                    break;
                case 2:
                    msg = `${user}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`;
                    break;
            }
            await interaction.reply({ content: msg });
            await memberTarget.voice.setChannel(null);
        } else {
            await interaction.reply({ content: `chill mon <:catGun:790433695998935090>. ${user} już śpi :sleeping:`, ephemeral: true });
        }
    }
};

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
