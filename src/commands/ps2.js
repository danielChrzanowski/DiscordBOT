module.exports = {
    name: 'ps2',
    description: 'Prints PlanetSide 2 Miller population',

    async execute(client, message, args) {
        const { default: fetch } = await import('node-fetch');

        try {
            if (args[0] != null) {
                await fetch('https://census.daybreakgames.com/get/ps2:v2/character/?name.first_lower=' + args[0].toLowerCase())
                    .then(response => response.json())
                    .then(data => {
                        if (data.returned == 0) {
                            message.reply("Nie ma gracza o nicku \"" + args[0] + "\"");
                            return;
                        } else {
                            playerName = data.character_list[0].name.first;
                            certs = data.character_list[0].certs.available_points;
                            lastLoginDate = data.character_list[0].times.last_login_date;
                            lastSaveDate = data.character_list[0].times.last_save_date;

                            message.channel.send("Gracz: \"" + playerName + "\"\nCerty: " + certs
                                + "\nOstatnie logowanie: " + lastLoginDate + "\nOstatni save: " + lastSaveDate);
                        }
                    });

            } else {

                const { result } = await fetch('https://ps2.fisu.pw/api/population/?world=10')
                    .then(response => response.json());
                var countPop = result[0].vs + result[0].nc + result[0].tr + result[0].ns;

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
                }

                const encodedChart = encodeURIComponent(JSON.stringify(chart));
                const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

                message.channel.send(chartUrl);
            }
        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("PS2 nie działa :(");
            message.reply("nie ma wykresu, bo API nie działa :(");
        }
    }
}
