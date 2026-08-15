import { getDomElements, renderGame, reset, updateSelection } from "./render";
import { ticTac, resetBoard, getState, makeMove } from "./state";

const domElements = getDomElements();

function playCell() {
  domElements.cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const tic = ticTac(index);
      renderGame(getState, tic, resetBoard);
    });
  });
}

function resetBttn() {
  domElements.resetButton.addEventListener("click", () => {
    reset(resetBoard, getState);
  });
}

function keyboard() {
  const keys = [
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "Enter",
    " ",
  ];
  domElements.cells.forEach((e, index) => {
    e.addEventListener("keydown", (event) => {
      for (let i = 0; i < keys.length; i++) {
        if (event.key === keys[i]) {
          event.preventDefault();
        }
      }
      switch (event.key) {
        case "ArrowRight":
          if (getState().selectedCell % 3 < 2) makeMove("right");

          break;

        case "ArrowLeft":
          if (getState().selectedCell % 3 > 0) makeMove("left");
          break;

        case "ArrowDown":
          if (getState().selectedCell < 6) makeMove("down");
          break;

        case "ArrowUp":
          if (getState().selectedCell >= 3) makeMove("up");
          break;

        case "Enter":
        case " ": {
          const tac = ticTac(getState().selectedCell);
          renderGame(getState, tac, resetBoard);
          break;
        }
        default:
          return;
      }
      if (getState().selectedCell !== getState().oldSelectedCell) {
        updateSelection(getState().selectedCell);
        domElements.cells[getState().selectedCell].focus();
      }
    });
  });
}

export { keyboard, playCell, resetBttn };
