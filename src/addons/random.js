module.exports = {
    name: 'random',
    description: 'Return random number between min and max',

    execute(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}