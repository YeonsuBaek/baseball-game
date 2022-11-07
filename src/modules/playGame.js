const MissionUtils = require("@woowacourse/mission-utils");
const {
  NUMBER_LENGTH,
  SCORES,
  MESSAGES,
  ERRORS,
  OPTIONS,
} = require("../constants");
const { selectComputer } = require("./selectComputer");
const { isUserError } = require("./isUserError");

playGame = () => {
  const computer = selectComputer();
  solveNumber(computer);
};

solveNumber = (computer) => {
  MissionUtils.Console.readLine(MESSAGES.INPUT_NUMBER, (num) => {
    isUserError(num);
    countScore(computer, num);
  });
};

countScore = (computer, user) => {
  const score = calculateScore(computer, user);
  const result = printScore(score, computer);
  return isAnswer(result, computer);
};

calculateScore = (computer, user) => {
  let ball = 0;
  let strike = 0;
  const intersection = [...computer].filter((number) =>
    [...user].includes(number)
  );

  intersection.forEach((number) => {
    ball++;

    if (computer.indexOf(number) === user.indexOf(number)) {
      ball--;
      strike++;
    }
  });
  return { ball, strike };
};

printScore = ({ ball, strike }) => {
  let result = [];
  if (ball > 0) {
    result.push(`${ball}${SCORES.BALL}`);
  }
  if (strike > 0) {
    result.push(`${strike}${SCORES.STRIKE}`);
  }
  if (result.length === 0) {
    result.push(SCORES.NOTHING);
  }
  result = result.join(" ");

  MissionUtils.Console.print(result);
  return result;
};

isAnswer = (answer, computer) => {
  if (answer.includes(`${NUMBER_LENGTH}${SCORES.STRIKE}`)) {
    MissionUtils.Console.print(MESSAGES.SUCCESS);
    return selectOption();
  }

  solveNumber(computer);
};

selectOption = () => {
  MissionUtils.Console.readLine(MESSAGES.INPUT_OPTION, (num) => {
    isOptionError(num);
  });
};

isOptionError = (option) => {
  const RESTART = OPTIONS.RESTART;
  const END = OPTIONS.END;

  if (option !== RESTART && option !== END) {
    throw ERRORS.OPTION;
  }

  if (option === RESTART) {
    return playGame();
  }

  if (option === END) {
    MissionUtils.Console.print(MESSAGES.END);
  }
};

exports.playGame = playGame;