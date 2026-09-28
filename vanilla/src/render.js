import Xicon from "./assets/X.svg?raw";
import Oicon from "./assets/O.svg?raw";

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
function renderGame(getState, tictac, resetBoard, index) {
  // if (!tictac) return;
  // getState().board.forEach((e, index) => {
  //   if (e === "") {
  //     cells[index].textContent = e;
  //   } else if (e === "X") {
  //     cells[index].innerHTML = Xicon;
  //   } else if (e === "O") {
  //     cells[index].innerHTML = Oicon;
  //   }
  // });

  if (getState().board[index] === "") {
    cells[index].textContent = e;
  } else if (getState().board[index] === "X") {
    cells[index].innerHTML = Xicon;
  } else if (getState().board[index] === "O") {
    cells[index].innerHTML = Oicon;
  }

  whoIsTurn.textContent = `${getState().turn} is turn`;
  updateSelection(getState().selectedCell);
  if (tictac.winning) {
    tictac.winning.forEach((index, winnerindex) => {
      cells[index].classList.add("winner");
      cells[index].dataset.winnerOrder = winnerindex;
    });
    result.textContent = `${getState().turn} won`;
    timerReset = setTimeout(() => {
      reset(resetBoard, getState, tictac);
    }, 5000);
  } else if (tictac.draw) {
    result.textContent = "draw";
    timerReset = setTimeout(() => {
      reset(resetBoard, getState, tictac);
    }, 5000);
  }
}

function reset(resetBoard, getState, tictac) {
  clearTimeout(timerReset);
  const svg = document.querySelectorAll("svg");

  function clearBoard() {
    resetBoard();
    let animationed = 0;
    getState().board.forEach((e, index) => {
      cells[index].textContent = e;
      cells[index].classList.add("idle-board-animation");
      cells[index].addEventListener("animationend", () => {
        animationed++;
        if (animationed === getState().board.length) {
          cells.forEach((cell) => {
            cell.classList.remove("idle-board-animation");
          });
        }
      });
    });
    result.textContent = ".....";
    whoIsTurn.textContent = `X is turn`;
    cells.forEach((cell) => {
      cell.classList.remove("winner");
    });
    updateSelection(0);
    cellFocus();
  }
  let finished = 0;
  svg.forEach((e, index) => {
    e.style.setProperty("--stagger", `${index * 60}ms`);
    e.classList.add("svg-animation");
    e.addEventListener(
      "animationend",
      () => {
        finished++;
        if (finished === svg.length) {
          let fade = 0;
          tictac.winning.forEach((e) => {
            cells[e].classList.add("winner-fade");
            cells[e].addEventListener(
              "animationend",
              () => {
                fade++;
                if (fade === tictac.winning.length) {
                  clearBoard();
                  tictac.winning.forEach((e) => {
                    cells[e].classList.remove("winner-fade");
                    delete cells[e].dataset.winnerOrder;
                  });
                }
              },
              { once: true },
            );
          });
        }
      },
      { once: true },
    );
  });
}
function updateSelection(i) {
  cells.forEach((cell) => cell.classList.remove("selected"));
  cells[i].classList.add("selected");
}
updateSelection(0);
function keyboardUpdateSelection(i) {
  cells.forEach((cell) => cell.classList.remove("keyboard-selected"));
  cells[i].classList.add("keyboard-selected");
}
function cellFocus() {
  cells[0].focus();
}
cellFocus();
function getDomElements() {
  return { resetButton: resetBtn, cells: cells };
}
export {
  getDomElements,
  renderGame,
  reset,
  updateSelection,
  keyboardUpdateSelection,
};
