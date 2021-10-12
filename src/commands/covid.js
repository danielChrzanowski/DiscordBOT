const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    description: 'Prints covid-19 stats in Poland',

    async execute(client, message) {
        try {
            const response = await fetch('https://corona-api.com/countries/PL');
            const result = await response.json();

            var newConfirmed = new Array();
            var date = new Array();

            for (var i = 0; i < 14; i++) {
                newConfirmed.push(result.data.timeline[i].new_confirmed);
                date.push(result.data.timeline[i].date);
            }

            newConfirmed.reverse();
            date.reverse();

            const chart = {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [
                        {
                            data: newConfirmed,
                            fill: true,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'New confirmed covid-19 cases in Poland',
                        fontColor: 'rgb(220, 220, 220)',
                        fontSize: 24,
                        padding: 25
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: 'rgb(220, 220, 220)'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontColor: 'rgb(220, 220, 220)'
                            },
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            }

            const encodedChart = encodeURIComponent(JSON.stringify(chart));
            const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;

            await message.channel.send(chartUrl);
            message.channel.send("--------------\nŹródło: https://about-corona.net/documentation");

        } catch (error) {
            console.log(error);
            client.channels.cache.get(process.env.LOG_CHANNEL_ID).send("--------------\ncovid nie działa :(\n" + globalVariables.execute("currentDate"));
            message.reply("nie ma wykresu, bo API nie działa :(");
        }
    }
}