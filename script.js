/**
 * Board module
 */
const board = (function() {

    /**
     * Stores the board's position
     * @type {Array}
     */
    boardArray = [
        ['*', '*', '*'],
        ['*', '*', '*'],
        ['*', '*', '*']
    ];

    /**
     * Prinst the board to the console
     */
    const printBoard = function() {
        console.table(boardArray);
    };
    
    return {
        printBoard
    };
})();

board.printBoard(); // To be deleted

/**
 * Controller module
 */
const controller = (function() {
    const init = () => {
        // Initialize game
    };

    const nextTurn = () => {

    };

    return {

    };
})();

/**
 * Player factory
 */
const Player = function(name) {
    return {
        name,
    };
}
