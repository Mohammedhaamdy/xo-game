const whoIsTurn = document.getElementById("turn");
const result = document.getElementById("result");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset-btn");
let timerReset;
result.textContent = ".....";
whoIsTurn.textContent = `X is turn`;
cells.forEach((cell) => {
  cell.tabIndex = 0;
});
function renderGame(getState, tictac, resetBoard) {
  // if (!tictac) return;
  getState().board.forEach((e, index) => {
    cells[index].textContent = e;
  });
  whoIsTurn.textContent = `${getState().turn} is turn`;
  updateSelection(getState().selectedCell);
  if (tictac.winning) {
    tictac.winning.forEach((index) => cells[index].classList.add("winner"));
    result.textContent = `${getState().turn} won`;
    timerReset = setTimeout(() => {
      reset(resetBoard, getState);
    }, 5000);
  } else if (tictac.draw) {
    result.textContent = "draw";
    timerReset = setTimeout(() => {
      reset(resetBoard, getState);
    }, 5000);
  }
}

function reset(resetBoard, getState) {
  resetBoard();
  getState().board.forEach((e, index) => {
    cells[index].textContent = e;
  });
  result.textContent = ".....";
  whoIsTurn.textContent = `X is turn`;
  cells.forEach((cell) => {
    cell.classList.remove("winner");
  });
  updateSelection(0);
  cellFocus();
  clearTimeout(timerReset);
}
function updateSelection(i) {
  cells.forEach((cell) => cell.classList.remove("selected"));
  cells[i].classList.add("selected");
}
updateSelection(0);

function cellFocus() {
  cells[0].focus();
}
cellFocus();
function getDomElements() {
  return { resetButton: resetBtn, cells: cells };
}
export { getDomElements, renderGame, reset, updateSelection };
