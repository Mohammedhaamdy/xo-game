const whoIsTurn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");
const cellsArray = Array.from(cells);
const playerX = "X";
const playerO = "O";
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let turn = playerX;
let gameOver = false;
result.textContent = ".....";
whoIsTurn.textContent = `${turn} is turn`;
// Win Condition
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

// Winner function
function checkWinner(player) {
  return winningConditions.find((condition) =>
    condition.every((index) => gameBoard[index] === player),
  );
}

function checkDraw() {
  return (
    gameBoard.every((cell) => cell !== "") &&
    !checkWinner(playerX) &&
    !checkWinner(playerO)
  );
}
// reset game function
function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "";
  });
  gameBoard.fill("");
  gameOver = false;
  turn = playerX;
  whoIsTurn.textContent = `${turn} is turn`;
  result.textContent = ".....";
}

function ticTac(cell, index) {
  if (gameOver) return;
  if (gameBoard[index] !== "") return;
  gameBoard[index] = turn;
  cell.textContent = turn;

  let winning = checkWinner(turn);
  // check winner
  if (winning) {
    gameOver = true;
    result.textContent = `${turn} won`;
    winning.forEach((index) => (cells[index].style.color = "green"));
    setTimeout(resetBoard, 5000);
    return;
  }
  // Check draw
  if (checkDraw()) {
    gameOver = true;
    result.textContent = `Draw`;
    whoIsTurn.textContent = `.....`;
    setTimeout(resetBoard, 5000);
    return;
  }

  turn === playerX
    ? ((turn = playerO), (whoIsTurn.textContent = `${turn} is turn`))
    : ((turn = playerX), (whoIsTurn.textContent = `${turn} is turn`));
}
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => ticTac(cell, index));
});

