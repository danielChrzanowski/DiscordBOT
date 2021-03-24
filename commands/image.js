var Scrapper = require('images-scraper');

const google = new Scrapper({
    puppeteer: {
        headless: true
    }
});

module.exports = {
    name: 'image',

    async execute(client, message, args) {
        const image_query = args.join(' ');
        if (!image_query) return message.reply('Podaj nazwę obrazka');

        const rand = (Math.random() * 200 + Math.random()).toFixed(0);
        const image_results = await google.scrape(image_query, 200);
        message.channel.send(image_results[rand].url);
    }

}