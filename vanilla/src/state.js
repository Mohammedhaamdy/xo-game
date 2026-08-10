const gameBoard = ["", "", "", "", "", "", "", "", ""];
const playerX = "X";
const playerO = "O";
let turn = playerX;
let gameOver = false;
let selectedCell = 0;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// reset function
function resetBoard() {
  gameBoard.fill("");
  gameOver = false;
  turn = playerX;
  selectedCell = 0;
}
// Winner check function
function checkWinner(player) {
  return (
    winningConditions.find((condition) =>
      condition.every((index) => gameBoard[index] === player),
    ) ?? null
  );
}
// draw check function
function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

function ticTac(index) {
  // if game is over or cell is already filled, do nothing
  if (gameOver) return { state: getState(), winning: null, draw: false };

  if (gameBoard[index] !== "") {
    selectedCell = index;
    return { state: getState(), winning: null, draw: false };
  }
  gameBoard[index] = turn;
  selectedCell = index;
  const winning = checkWinner(turn);
  const draw = checkDraw();
  // check winner
  if (winning) {
    gameOver = true;
    return { state: getState(), winning: winning, draw: draw };
  }
  // Check draw
  if (draw) {
    gameOver = true;
    return { state: getState(), winning: winning, draw: draw };
  }
  turn === playerX ? (turn = playerO) : (turn = playerX);
  return { state: getState(), winning: winning, draw: draw };
}
function makeMove(move) {
  switch (move) {
    case "right":
      selectedCell++;
      break;
    case "left":
      selectedCell--;
      break;
    case "down":
      selectedCell += 3;
      break;
    case "up":
      selectedCell -= 3;
      break;
  }
}

function getState() {
  return {
    board: gameBoard,
    turn: turn,
    selectedCell: selectedCell,
    gameOver: gameOver,
  };
}

export { ticTac, resetBoard, getState, makeMove };
