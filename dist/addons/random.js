// Converted from random.js to TypeScript
const random = {
    name: 'random',
    description: 'Return random number between min and max',
    execute(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
export default random;
