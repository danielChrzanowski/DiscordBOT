import { getRandom } from "./utils.js";

const cuteReactions = [
    '<:pupperBless:781254877682729001>',
    '<:disaSmile:812821278984765490>',
    '<:catJuice:790433770092101672>',
    '<:otterP:797264682413981747>'
];

const nekoReactions = [
    '<:peepoWOOpantsu:474699651661168661>',
    '<:catJuice:790433770092101672>',
    '<:catGold:886107774847705118>',
    '<:pupperSmirk:776134507090149376>'
];

const getRandomCuteReaction = (): string => {
    const randomIndex = getRandom(0, cuteReactions.length - 1);
    return cuteReactions[randomIndex];
}

const getRandomNekoReaction = (): string => {
    const randomIndex = getRandom(0, nekoReactions.length - 1);
    return nekoReactions[randomIndex];
}

export { getRandomCuteReaction, getRandomNekoReaction };
