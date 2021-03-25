const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    name: 'image',
    description: 'Prints image from Google',

    async execute(client, message, args) {
        var parameter = "";

        args.forEach(element => {
            parameter += element + " ";
        });

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + parameter,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function (error, response, responseBody) {
            if (error) {
                return;
            }
            $ = cheerio.load(responseBody);

            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            if (!urls.length) {
                return;
            }

            message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
        });
    }

}
