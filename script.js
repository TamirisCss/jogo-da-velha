const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMsgDiv = document.querySelector("[data-winning-msg]");
const winnerMsgText = document.querySelector("[data-winner-msg]");
const restartBtn = document.querySelector("[data-restart-btn]");

let isCircleTurn;

// winning combinations
let winnigCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Game start with "X"
const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMsgDiv.classList.remove("show-winner-msg");
};

//winner message
const endGame = (isDraw) => {
  if (isDraw) {
    winnerMsgText.innerText = "Empate";
  } else {
    winnerMsgText.innerHTML = isCircleTurn ? "O venceu!" : "X venceu";
  }

  winningMsgDiv.classList.add("show-winner-msg");
};

// check the winner
const checkForWin = (currentPlayer) => {
  return winnigCombinations.some((combinantion) => {
    return combinantion.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  //add "X" or "cricle"
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  //change symbol
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // add "X" or "cricle"
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // check for the winner
  const isWin = checkForWin(classToAdd);

  //   check if is a draw
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    //change symbol
    swapTurns();
  }
};

startGame();
restartBtn.addEventListener("click", startGame);
