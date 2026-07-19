// DOM Elements
const whoIsTurn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");
// Constants and Variables
const playerX = "X";
const playerO = "O";
// gamestates
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let turn = playerX;
let gameOver = false;
let selectedCell = 0;
let timerReset;
result.textContent = ".....";
whoIsTurn.textContent = `${turn} is turn`;
// Check all 8 possible winning combinations (3 rows, 3 cols, 2 diagonals)
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
// ===Game Logic===
function render() {
  gameBoard.forEach((e, index) => {
    cells[index].textContent = e;
  });
}

// Winner check function
function checkWinner(player) {
  return winningConditions.find((condition) =>
    condition.every((index) => gameBoard[index] === player),
  );
}
// draw check function
function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}
// reset function
function resetBoard() {
  cells.forEach((cell) => {
    cell.classList.remove("winner");
  });
  gameBoard.fill("");
  render()
  gameOver = false;
  turn = playerX;
  selectedCell = 0;
  whoIsTurn.textContent = `${turn} is turn`;
  result.textContent = ".....";
  updateSelection(selectedCell);
}

function ticTac(cell, index) {
  if (gameOver || gameBoard[index] !== "") return; // if game is over or cell is already filled, do nothing
  gameBoard[index] = turn;
  render()
  selectedCell = index;
  updateSelection(selectedCell);

  const winning = checkWinner(turn);
  // check winner
  if (winning) {
    gameOver = true;
    result.textContent = `${turn} won`;
    winning.forEach((index) => cells[index].classList.add("winner"));
    timerReset = setTimeout(resetBoard, 5000);
    return;
  }
  // Check draw
  if (checkDraw()) {
    gameOver = true;
    result.textContent = `Draw`;
    whoIsTurn.textContent = `.....`;
    timerReset = setTimeout(resetBoard, 5000);
    return;
  }
  turn === playerX
    ? ((turn = playerO), (whoIsTurn.textContent = `${turn} is turn`))
    : ((turn = playerX), (whoIsTurn.textContent = `${turn} is turn`));
}
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => ticTac(cell, index));
});

//  ===Keyboard navigation===
function updateSelection(i) {
  cells.forEach((cell) => cell.classList.remove("selected"));
  cells[i].classList.add("selected");
}
updateSelection(selectedCell); // initial selection
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowRight":
      if (selectedCell % 3 < 2) selectedCell++;
      break;

    case "ArrowLeft":
      if (selectedCell % 3 > 0) selectedCell--;
      break;

    case "ArrowDown":
      if (selectedCell < 6) selectedCell += 3;
      break;

    case "ArrowUp":
      if (selectedCell >= 3) selectedCell -= 3;
      break;

    case "Enter":
    case " ":
      ticTac(cells[selectedCell], selectedCell);
      break;
    default:
      return;
  }

  updateSelection(selectedCell);
});
