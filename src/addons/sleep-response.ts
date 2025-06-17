import { getRandom } from "./utils.js";

let lastSleepResponseIndex = -1;

const getRandomSleepResponse = (mention: string): string => {
  const responses = [
    `${mention}, milusia kołderka <:pupperSleep:788211096481562654>`,
    `${mention}, do spania dziecko drogie <:dogeSleep:781255974077464636>`,
    `${mention}, Foxik mówi dobranoc <:chibiFox:474699471670738954>`,
  ];

  let index: number;
  do {
    index = getRandom(0, responses.length - 1);
  } while (index === lastSleepResponseIndex);
  lastSleepResponseIndex = index;
  return responses[index];
};

export { getRandomSleepResponse };
