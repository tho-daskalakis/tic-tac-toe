// Get DOM elements

const boardDivs = [...document.querySelectorAll(".board>div")];

const display = document.querySelector(".info-display");

const restartBtn = document.querySelector(".container .restart-btn button");

// Game logic

/**
 * Board module
 */
const board = (function () {
  /**
   * Stores the board's position
   * @type {Array}
   */
  boardArray = ["1", "2", "*", "*", "*", "*", "*", "8", "9"];

  const getBoard = () => {
    return boardArray;
  };

  const setBoard = (index, value) => {
    boardArray[index] = value;

    controller.updateDisplay();
  };

  return {
    getBoard,
    setBoard,
  };
})();

/**
 * Controller module
 */
const controller = (function () {
  let currentPlayer = 0;

  let turnNum = 1;

  const init = () => {
    // Initialize game

    currentPlayer = 0;
    turnNum = 1;

    gameEnd.initIndexes();

    for (let i = 0; i < 9; i++) {
      board.setBoard(i, "");
    }

    boardDivs.forEach((div) => (div.style.backgroundColor = "white"));
    boardDivs.forEach((div) => (div.style.color = "black"));

    display.textContent = `Now playing: ${players[
      currentPlayer
    ].getName()}, ${players[currentPlayer].getMark()}`;

    updateDisplay();

    // Add click events
    boardDivs.forEach((div) =>
      div.addEventListener("click", onMouseClick, { once: true })
    );
  };

  const onMouseClick = (e) => {
    const index = boardDivs.indexOf(e.target);

    board.setBoard(index, players[currentPlayer].getMark());

    nextTurn();
  };

  const updateDisplay = () => {
    for (let i = 0; i < 9; i++) {
      boardDivs[i].querySelector("p").textContent = board.getBoard()[i];
    }
  };

  const nextTurn = () => {
    let winner = gameEnd.isWin();

    if (winner !== undefined) {
      boardDivs.forEach((div) =>
        div.removeEventListener("click", onMouseClick)
      );

      gameEnd.getWinIndexes().forEach((index) => {
        boardDivs[index].style.backgroundColor = "teal";
        boardDivs[index].style.color = "yellow";
      });

      display.textContent = `${players[currentPlayer].getName()}, ${players[
        currentPlayer
      ].getMark()} wins!`;

      return;
    }

    if (gameEnd.isTie()) {
      display.textContent = "The game is a tie.";

      return;
    }

    turnNum++;

    currentPlayer = (currentPlayer + 1) % 2;

    display.textContent = `Now playing: ${players[
      currentPlayer
    ].getName()}, ${players[currentPlayer].getMark()}`;
  };

  const getTurnNum = () => {
    return turnNum;
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  return {
    init,
    updateDisplay,
    getCurrentPlayer,
    getTurnNum,
  };
})();

const gameEnd = (function () {
  let winIndexes = [];

  const isWin = () => {
    const currentBoard = board.getBoard();

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[3 * i] !== "" &&
        currentBoard[3 * i] === currentBoard[3 * i + 1] &&
        currentBoard[3 * i + 1] === currentBoard[3 * i + 2]
      ) {
        winIndexes.push(3 * i);
        winIndexes.push(3 * i + 1);
        winIndexes.push(3 * i + 2);
        return controller.getCurrentPlayer();
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[i] !== "" &&
        currentBoard[i] === currentBoard[i + 3] &&
        currentBoard[i + 3] === currentBoard[i + 6]
      ) {
        winIndexes.push(i);
        winIndexes.push(i + 3);
        winIndexes.push(i + 6);
        return controller.getCurrentPlayer();
      }
    }

    // Check top-left to bot-right diagonal
    if (
      currentBoard[0] !== "" &&
      currentBoard[0] === currentBoard[4] &&
      currentBoard[4] === currentBoard[8]
    ) {
      winIndexes.push(0);
      winIndexes.push(4);
      winIndexes.push(8);
      return controller.getCurrentPlayer();
    }

    // Check bot-left to top-right diagonal
    if (
      currentBoard[2] !== "" &&
      currentBoard[2] === currentBoard[4] &&
      currentBoard[4] === currentBoard[6]
    ) {
      winIndexes.push(2);
      winIndexes.push(4);
      winIndexes.push(6);
      return controller.getCurrentPlayer();
    }
  };

  const isTie = () => {
    const turn = controller.getTurnNum();

    if (turn < 9) {
      return false;
    } else {
      return true;
    }
  };

  const getWinIndexes = () => {
    return winIndexes;
  };

  const initIndexes = () => {
    winIndexes = [];
  };

  return {
    isWin,
    isTie,
    getWinIndexes,
    initIndexes,
  };
})();

/**
 * Player factory
 */
const Player = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark;

  return {
    getName,
    getMark,
  };
};

// Run commands
restartBtn.addEventListener("click", controller.init);

let players = [Player("Player 1", "X"), Player("Player 2", "O")];

controller.init();
