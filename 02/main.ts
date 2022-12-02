const data = await Deno.readTextFile("input.csv");

enum Move {
  Rock,
  Paper,
  Scissors,
}

enum Result {
  Lose = -1,
  Draw = 0,
  Win = 1,
}

type Strategy = {
  opponent: Move;
  player: Move;
};

let total = 0;

for (const line of data.split("\n")) {
  const fields = line.split(" ").map((
    field,
  ) => field.replace("\r", ""));

  const strategy: Strategy = {
    opponent: getMove(fields[0]),
    player: getMove(fields[1]),
  };

  // Part 2
  const suggestedMove = getPlayerMove(strategy.opponent, fields[1]);
  strategy.player = suggestedMove;

  const result: Result = playRound(strategy) as Result;

  total += strategy.player + 1;

  if (result === Result.Win) {
    total += 6;
  } else if (result === Result.Draw) {
    total += 3;
  }
}

console.info(total);

function playRound(strategy: Strategy): number { // Part 1
  if (strategy.opponent === strategy.player) {
    return 0;
  } else if (strategy.opponent === Move.Rock) {
    if (strategy.player === Move.Paper) {
      return 1;
    } else if (strategy.player === Move.Scissors) {
      return -1;
    }
  } else if (strategy.opponent === Move.Paper) {
    if (strategy.player === Move.Rock) {
      return -1;
    } else if (strategy.player === Move.Scissors) {
      return 1;
    }
  } else if (strategy.opponent === Move.Scissors) {
    if (strategy.player === Move.Rock) {
      return 1;
    } else if (strategy.player === Move.Paper) {
      return -1;
    }
  }

  return 0;
}

function getMove(input: string): Move {
  if (input === "A") {
    return Move.Rock;
  } else if (input === "B") {
    return Move.Paper;
  } else if (input === "C") {
    return Move.Scissors;
  } else if (input === "X") {
    return Move.Rock;
  } else if (input === "Y") {
    return Move.Paper;
  } else if (input === "Z") {
    return Move.Scissors;
  }

  throw new Error(`Invalid move: ${input}`);
}

function getPlayerMove(opponent: Move, input: string): Move {
  if (input === "X") { // Lose
    if (opponent === Move.Rock) {
      return Move.Scissors;
    } else if (opponent === Move.Paper) {
      return Move.Rock;
    } else if (opponent === Move.Scissors) {
      return Move.Paper;
    }
  } else if (input === "Y") { // Draw
    return opponent;
  } else if (input === "Z") { // Win
    if (opponent === Move.Rock) {
      return Move.Paper;
    } else if (opponent === Move.Paper) {
      return Move.Scissors;
    } else {
      return Move.Rock;
    }
  }

  throw new Error(`Invalid move: ${input}`);
}
