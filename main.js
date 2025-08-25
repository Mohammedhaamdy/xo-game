let turn = 'X';
let whoIsTurn = document.getElementById('turn');
let result = document.getElementById('result');
result.innerHTML = '.....';
whoIsTurn.innerHTML = `${turn} is turn`;

let cell1 = document.getElementById('row1');
let cell2 = document.getElementById('row2');
let cell3 = document.getElementById('row3');
let cell4 = document.getElementById('row4');
let cell5 = document.getElementById('row5');
let cell6 = document.getElementById('row6');
let cell7 = document.getElementById('row7');
let cell8 = document.getElementById('row8');
let cell9 = document.getElementById('row9');

function ticTac(id) {
  let box = document.getElementById(id);
  box.innerHTML = turn;

  // changing turns condition
  if (turn === 'X') {
    turn = 'O';
    whoIsTurn.innerHTML = `${turn} is turn`;
  } else {
    turn = 'X';
    whoIsTurn.innerHTML = `${turn} is turn`;
  }

  //winning condition
  if (
    (cell1.innerHTML === 'X' && cell3.innerHTML === 'X' && cell3.innerHTML === 'X') ||
    (cell4.innerHTML === 'X' && cell5.innerHTML === 'X' && cell6.innerHTML === 'X') ||
    (cell7.innerHTML === 'X' && cell8.innerHTML === 'X' && cell9.innerHTML === 'X') ||
    (cell1.innerHTML === 'X' && cell4.innerHTML === 'X' && cell7.innerHTML === 'X') ||
    (cell2.innerHTML === 'X' && cell5.innerHTML === 'X' && cell8.innerHTML === 'X') ||
    (cell3.innerHTML === 'X' && cell6.innerHTML === 'X' && cell9.innerHTML === 'X') ||
    (cell1.innerHTML === 'X' && cell5.innerHTML === 'X' && cell9.innerHTML === 'X') ||
    (cell3.innerHTML === 'X' && cell5.innerHTML === 'X' && cell7.innerHTML === 'X')
  ) {
    result.innerHTML = 'X player is the winner';
    setTimeout(() => {
      location.reload();
    }, 5000);
  } else if (
    (cell1.innerHTML === 'O' && cell3.innerHTML === 'O' && cell3.innerHTML === 'O') ||
    (cell4.innerHTML === 'O' && cell5.innerHTML === 'O' && cell6.innerHTML === 'O') ||
    (cell7.innerHTML === 'O' && cell8.innerHTML === 'O' && cell9.innerHTML === 'O') ||
    (cell1.innerHTML === 'O' && cell4.innerHTML === 'O' && cell7.innerHTML === 'O') ||
    (cell2.innerHTML === 'O' && cell5.innerHTML === 'O' && cell8.innerHTML === 'O') ||
    (cell3.innerHTML === 'O' && cell6.innerHTML === 'O' && cell9.innerHTML === 'O') ||
    (cell1.innerHTML === 'O' && cell5.innerHTML === 'O' && cell9.innerHTML === 'O') ||
    (cell3.innerHTML === 'O' && cell5.innerHTML === 'O' && cell7.innerHTML === 'O')
  ) {
    result.innerHTML = 'O player is the winner';
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}

