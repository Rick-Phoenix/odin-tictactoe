const li = document.querySelectorAll('li');
const h1 = document.querySelector('h1');
const button = document.querySelector('button');
let playerName = undefined;

const name = () => {
    let name = prompt('Insert your name');
    if (name == undefined || name == null || name === '') playerName = 'Mysterious Player'; 
    else playerName = name; 
};

name();
h1.textContent = `Hi ${playerName}, welcome to Odin Tic-Tac-Toe!`;


li.forEach((item) => {
    item.addEventListener('click', function() {
        game.round(this, 'X');
    })
});

button.addEventListener('click', () => game.resetGame());

const game = (() => {
    let board = new Array(9).fill(null);
    endGame = false;
    if (endGame == true) return;
    const winningCombinations = [[0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8]];

    const round = (cell, symbol) => {
        if (cell.classList.contains('filled') || endGame == true) return;
        const id = +cell.id;
        cell.textContent = symbol;
        board[id] = symbol;
        cell.classList.add('filled');
        checkGameEnd(symbol);
    }

    const filledCells = (symbol) => board.reduce((acc, cell, index, array) => {
        if (cell == symbol ) acc.push(index);
        return acc;
    }, [])

    const checkMove = (symbol) => {
        const userCells = filledCells(symbol);
        console.log(userCells)
        for (const comb of winningCombinations) {
            const [a, b, c] = comb;
            if (userCells.includes(a) && userCells.includes(b) && board[c] == null) {
                console.log(c)
                return c
            } 
            if (userCells.includes(b) && userCells.includes(c) && board[a] == null) {
                console.log(a)
                return a
            }
            if (userCells.includes(a) && userCells.includes(c) && board[b] == null) {
                console.log(b)
                return b
            } 
        }

        return false;
    }

    const checkGameEnd = (symbol) => {
        const moves = filledCells(symbol);
        for (comb of winningCombinations) {
            if (moves.includes(comb[0]) && moves.includes(comb[1]) && moves.includes(comb[2])) {
                if (symbol == 'X') h1.textContent = 'You won! :)';
                if (symbol == 'O') h1.textContent = 'You lost! :(';
                endGame = true;
                button.style.visibility = 'visible';
                return;
            }
        }

        if (!board.includes(null)) {
            h1.textContent = "It's a tie!";
            endGame = true;
            button.style.visibility = 'visible';
            return;
        }
        if (symbol == 'X') computerChoice();
    }

    const resetGame = () => {
        li.forEach((item) => {
            item.classList.remove('filled');
            item.textContent = '';
            board = new Array(9).fill(null);
            endGame = false;
            button.style.visibility = 'hidden';
            h1.textContent = `Hi ${playerName}, welcome to Odin Tic-Tac-Toe!`;
        });
    }

    const computerChoice = () => {
        let choice = checkMove('O') || checkMove('X') || getRandomCell();
        const targetCell = document.getElementById(`${choice}`);
        round(targetCell, 'O');
    }

    const getRandomCell = () => {
        const emptyCells = filledCells(null);
        console.log(emptyCells)
        const randomIndex = Math.floor(Math.random() * (emptyCells.length - 1))
        console.log(randomIndex)
        const randomCell = emptyCells[randomIndex];
        console.log(randomCell);
        return randomCell;
    }

    return {round, resetGame};
})();