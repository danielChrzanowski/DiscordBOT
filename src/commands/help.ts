import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import {
  MAX_MESSAGES_TO_DELETE_COUNT,
  MAX_USERS_TO_SLEEP_COUNT,
  MAX_USERS_TO_SUMMON_COUNT,
} from '../addons/constants.js';

const name = 'help';
const description = 'Prints bot commands';
const slashCommandBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

export default {
  name,
  description,
  slashCommandBuilder,
  async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    await interaction.editReply({
      content: `KOMENDY:
            -cat -> losowy koteł
            -clear <ile> -> kasowanie wiadomości (max: ${MAX_MESSAGES_TO_DELETE_COUNT} wiadomości, 14 dni wstecz)
            -doge-counter [użytkownik] -> licznik piesełów (opcjonalnie można podać użytkownika do sprawdzenia)
            -doge -> losowy pieseł
            -druzyna-ogniowa -> woła Drużynę Ogniową REEE
            -fun -> fun :)
            -neko <argument> -> losowe neko
            -ps2 [nick] -> populacja PS2 - Miller lub statystyki gracza (jeśli podasz nick w parametrze)
            -summon-fox -> przyzywa Foxa
            -summon <użytkownicy> -> przyzywa użytkowników (max ${MAX_USERS_TO_SUMMON_COUNT})
            -sleep <użytkownicy> -> kick z głosowego (max ${MAX_USERS_TO_SLEEP_COUNT} użytkowników)
            -wipe-time -> woła do BnS REEE`,
    });
  },
};
