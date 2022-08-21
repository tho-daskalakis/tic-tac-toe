// Get DOM elements

const boardDivs = [...document.querySelectorAll('.board>div')];

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
        return this.boardArray;
    }

    const setBoard = (index, value) => {
        boardArray[index] = value;
        controller.updateDisplay();
    }
    
    return {
        getBoard,
        setBoard,
    };
})();

/**
 * Controller module
 */
const controller = (function() {

    let turnNum = 1;

    const nextValue = 'Value';

    const init = () => {
        // Initialize game
        
        for (let i = 0; i < 9; i++) {
            board.setBoard(i, '');
        }
        
        updateDisplay();

        // Add click events
        boardDivs.forEach(div => div.addEventListener('click', (e) => {
            const index = boardDivs.indexOf(e.target);
            board.setBoard(index, nextValue);
        }, {'once': true}));
    };

    const updateDisplay = () => {
        for (let i = 0; i < 9; i++) {
            boardDivs[i].querySelector('p').textContent = 
            board.getBoard()[i];
        }
    }

    const nextTurn = () => {
        turnNum++;
    };

    return {
        init,
        updateDisplay,
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
controller.init();
