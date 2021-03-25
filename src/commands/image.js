var Scrapper = require('images-scraper');

const google = new Scrapper({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

module.exports = {
    name: 'image',
    description: 'Prints image from Google',

    async execute(client, message, args) {
        const image_query = args.join(' ');
        if (!image_query) return message.reply('podaj nazwę obrazka');

        const rand = getRandomInt(0, 200);
        const image_results = await google.scrape(image_query, 200);
        message.channel.send(image_results[rand].url);
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}