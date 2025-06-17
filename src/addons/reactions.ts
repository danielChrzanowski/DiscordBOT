import { getRandom } from "./utils.js";

var lastRandomReactionIndex = -1;

const cuteReactions = [
  "<:pupperBless:781254877682729001>",
  "<:disaSmile:812821278984765490>",
  "<:catJuice:790433770092101672>",
  "<:otterP:797264682413981747>",
  "<:dogeEars:867559956257046548>",
  "<:catAmazing:790433477740593213>",
];

const nekoReactions = [
  "<:peepoWOOpantsu:474699651661168661>",
  "<:catJuice:790433770092101672>",
  "<:catGold:886107774847705118>",
  "<:pupperSmirk:776134507090149376>",
];

const getRandomCuteReaction = (): string => {
  let randomIndex: number;
  do {
    randomIndex = getRandom(0, cuteReactions.length - 1);
  } while (randomIndex === lastRandomReactionIndex);
  lastRandomReactionIndex = randomIndex;
  return cuteReactions[randomIndex];
};

const getRandomNekoReaction = (): string => {
  let randomIndex: number;
  do {
    randomIndex = getRandom(0, nekoReactions.length - 1);
  } while (randomIndex === lastRandomReactionIndex);
  lastRandomReactionIndex = randomIndex;
  return nekoReactions[randomIndex];
};

export { getRandomCuteReaction, getRandomNekoReaction };
