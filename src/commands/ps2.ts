import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const name = 'ps2';
const description = 'Prints PlanetSide 2 Miller population';
const slashCommandBuilder = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .addStringOption(option =>
        option.setName('nick')
            .setDescription('Nick gracza (opcjonalnie)')
            .setRequired(false)
    );

export default {
    name,
    description,
    slashCommandBuilder,
    async executeSlash(client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const { default: fetch } = await import('node-fetch');
        const nick = interaction.options.getString('nick');
        try {
            if (nick) {
                await fetch('https://census.daybreakgames.com/get/ps2:v2/character/?name.first_lower=' + nick.toLowerCase())
                    .then((response: any) => response.json())
                    .then((data: any) => {
                        if (data.returned == 0) {
                            interaction.editReply({ content: `Nie ma gracza o nicku "${nick}"` });
                            return;
                        } else {
                            const playerName = data.character_list[0].name.first;
                            const certs = data.character_list[0].certs.available_points;
                            const lastLoginDate = data.character_list[0].times.last_login_date;
                            const lastSaveDate = data.character_list[0].times.last_save_date;
                            interaction.editReply({ content: `Gracz: "${playerName}"
Certy: ${certs}
Ostatnie logowanie: ${lastLoginDate}
Ostatni save: ${lastSaveDate}` });
                        }
                    });
            } else {
                const { result } = await fetch('https://ps2.fisu.pw/api/population/?world=10').then((response: any) => response.json());
                const countPop = result[0].vs + result[0].nc + result[0].tr + result[0].ns;
                const chart = {
                    type: 'doughnut',
                    data: {
                        labels: ['VS', 'NC', 'TR'],
                        datasets: [{
                            data: [result[0].vs, result[0].nc, result[0].tr],
                            backgroundColor: [
                                'rgba(125, 11, 165, 1)',
                                'rgba(11, 90, 165, 1)',
                                'rgba(165, 11, 11, 1)'
                            ],
                            borderColor: [
                                'rgba(125, 11, 165, 1)',
                                'rgba(11, 90, 165, 1)',
                                'rgba(165, 11, 11, 1)'
                            ]
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Miller population (' + countPop + ')',
                            fontColor: 'white',
                            fontSize: 24,
                        },
                        legend: {
                            labels: {
                                fontColor: 'white',
                                fontStyle: 'bold'
                            }
                        },
                        plugins: {
                            datalabels: {
                                color: 'white',
                                font: { size: 18 },
                            }
                        }
                    }
                };
                const encodedChart = encodeURIComponent(JSON.stringify(chart));
                const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
                interaction.editReply({ content: chartUrl });
            }
        } catch (error) {
            console.log(error);
            const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID!);
            if (logChannel && (logChannel as any).send) (logChannel as any).send("PS2 nie działa :(");
            interaction.editReply({ content: "nie ma wykresu, bo API nie działa :(" });
        }
    },
};
