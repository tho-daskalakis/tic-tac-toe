// Get DOM elements

const boardDivs = [...document.querySelectorAll('.board>div')];

// Game logic

/**
 * Board module
 */
const board = (function() {

    /**
     * Stores the board's position
     * @type {Array}
     */
    boardArray = [
        '1', '2', '*',
        '*', '*', '*',
        '*', '8', '9'
    ];

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
const controller = (function() {

    let currentPlayer = 0;

    let turnNum = 1;

    const init = () => {
        // Initialize game
        
        for (let i = 0; i < 9; i++) {
            board.setBoard(i, '');
        }
        
        updateDisplay();

        // Add click events
        boardDivs.forEach(div => div.addEventListener('click', (e) => {
            
            const index = boardDivs.indexOf(e.target);
            
            board.setBoard(index, players[currentPlayer].getMark());
            
            nextTurn();

        }, {'once': true}));
    };

    const updateDisplay = () => {
        
        for (let i = 0; i < 9; i++) {
            boardDivs[i].querySelector('p').textContent = board.getBoard()[i];
        }
    };

    const nextTurn = () => {
        let winner = gameEnd.isWin();

        if (winner !== undefined) {
            console.log('Winner is ' + players[winner].getName());
        }

        if (gameEnd.isTie()) {
            console.log('Game is a tie');
        }

        turnNum++;

        currentPlayer = (currentPlayer + 1) % 2;
    };

    const getTurnNum = () => {
        return turnNum;
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    return {
        init,
        updateDisplay,
        getCurrentPlayer,
        getTurnNum,
    };
})();

const gameEnd = (function() {

    const isWin = () => {

        const currentBoard = board.getBoard();

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (currentBoard[3*i] !== '' && 
            (currentBoard[3*i] === currentBoard[3*i+1] && 
            currentBoard[3*i+1] === currentBoard[3*i+2])) {                
                return controller.getCurrentPlayer();
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (currentBoard[i] !== '' && 
            (currentBoard[i] === currentBoard[i+3] && 
            currentBoard[i+3] === currentBoard[i+6])) {
                return controller.getCurrentPlayer();
            }
        }

        // Check top-left to bot-right diagonal
        if (currentBoard[0] !== '' && (
        currentBoard[0] === currentBoard[4] && 
        currentBoard[4] === currentBoard[8])) {
            return controller.getCurrentPlayer();
        }

        // Check bot-left to top-right diagonal
        if (currentBoard[2] !== '' && (
            currentBoard[2] === currentBoard[4] && 
            currentBoard[4] === currentBoard[6])) {
                return controller.getCurrentPlayer();
            }
    };

    const isTie = () => {
        const turn = controller.getTurnNum();

        if (turn < 9) {
            return false;
        }
        else {
            return true;
        }
    };

    return {
        isWin,
        isTie,
    };
})();

/**
 * Player factory
 */
const Player = function(name, mark) {
    
    const getName = () => name;

    const getMark = () => mark;

    return {
        getName,
        getMark,
    };
}

// Run commands
let players = [Player('Player 1', 'X'), Player('Player 2', 'O')];

controller.init();
