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

// Winner check function
function checkWinner(player) {
  return winningConditions.find((condition) =>
    condition.every((index) => gameBoard[index] === player),
  );
}
// draw check function
function checkDraw() {
  return (
    gameBoard.every((cell) => cell !== "") &&
    !checkWinner(playerX) &&
    !checkWinner(playerO)
  );
}
// reset function
function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "";
  });
  gameBoard.fill("");
  gameOver = false;
  turn = playerX;
  selectedCell = 0;
  whoIsTurn.textContent = `${turn} is turn`;
  result.textContent = ".....";
}

function ticTac(cell, index) {
  if (gameOver || gameBoard[index] !== "") return; // if game is over or cell is already filled, do nothing
  gameBoard[index] = turn;
  cell.textContent = turn;

  const winning = checkWinner(turn);
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

//  ===Keyboard navigation===

//selection update function
function updateSelection() {
  cells.forEach((cell) => cell.classList.remove("selected"));
  cells[selectedCell].classList.add("selected");
}
updateSelection(); // initial selection
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      if (selectedCell < 8) selectedCell++;
      break;

    case "ArrowLeft":
      if (selectedCell > 0) selectedCell--;
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

  updateSelection();
});
