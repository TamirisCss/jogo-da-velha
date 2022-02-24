const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");

let isCircleTurn;

// winning combinations
let winnigCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//Game start with "X"
const startGame = () => {
    for(const cell of cellElements) {
        cell.addEventListener("click", handleClick, { once: true });
    }

    isCircleTurn = false;
    board.classList.add("x");
}

// check the winner
const checkForWin = (currentPlayer) => {
    return winnigCombinations.some((combinantion) => {
        return combinantion.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    //add "X" or "cricle"
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    //change symbol
    isCircleTurn = !isCircleTurn

    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleTurn) {
        board.classList.add("circle");
    }else {
        board.classList.add("x");
    }
}

const handleClick = (e) => {
    // add "X" or "cricle"
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // check for the winner
    const isWin = checkForWin(classToAdd);
    if(isWin){
        console.log("winner");
    }

    //change symbol
    swapTurns();
}

startGame();


