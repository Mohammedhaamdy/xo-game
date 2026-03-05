
const whoIsTurn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");
const cellsArray = Array.from(cells);
const playerX = "X";
const playerO = "O";
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
  return winningConditions.some((condition) =>
    condition.every((index) => cells[index].textContent === player)
  );
}
// Draw function
// function checkDraw() {
//   if (
//     cellsArray.every((cell) => cell.textContent !== "") &&
//     !checkWinner("X") &&
//     !checkWinner("O")
//   ) {
//     gameOver = true;
//     result.textContent = "Draw";
//     setTimeout(resetBoard, 5000);
//   }
// }
function checkDraw() {
  return (
    cellsArray.every((cell) => cell.textContent !== "") &&
    !checkWinner("X") &&
    !checkWinner("O")
  );
}
// reset game function
function resetBoard() {
  cells.forEach((cell) => (cell.textContent = ""));
  gameOver = false;
  turn = playerX;
  whoIsTurn.textContent = `${turn} is turn`;
  result.textContent = ".....";
}

function ticTac(id) {
  let box = document.getElementById(id);
  if (gameOver) return;
  if (box.textContent !== "") return;
  box.textContent = turn;

  // check winner
  if (checkWinner(turn)) {
    gameOver = true;
    result.textContent = `${turn} won`;
    setTimeout(resetBoard, 5000);
  }
  // Check draw
  if (checkDraw2()) {
    gameOver = true;
    result.textContent = `Draw`;
    setTimeout(resetBoard, 5000);
  }

  turn === playerX
    ? ((turn = playerO), (whoIsTurn.textContent = `${turn} is turn`))
    : ((turn = playerX), (whoIsTurn.textContent = `${turn} is turn`));
}
cells.forEach((cell) => {
  cell.addEventListener("click", () => ticTac(cell.id));
});
