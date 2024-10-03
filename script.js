const li = document.querySelectorAll('li');
const h1 = document.querySelector('h1');
const button = document.querySelector('button');
let playerName = undefined;

const name = () => {
    let name = prompt('Insert your name');
    if (name == undefined || name == null) playerName = 'Mysterious Player'; 
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

    const round = (cell, symbol) => {
        if (cell.classList.contains('filled') || endGame == true) return;
        const id = +cell.id;
        cell.textContent = symbol;
        board[id] = symbol;
        cell.classList.add('filled');
        checkWin(symbol);
    }

    const checkWin = (symbol) => {
        const winningCombinations = [[0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8]];
        const filledCells = board.reduce((acc, cell, index) => {
            if (cell == symbol) acc.push(index);
            return acc;
        }, [])
        
        for (comb of winningCombinations) {
            if (filledCells.includes(comb[0]) && filledCells.includes(comb[1]) && filledCells.includes(comb[2])) {
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
        const choice = (Math.floor(Math.random() * 9));
        const targetCell = document.getElementById(`${choice}`);
        if (targetCell.classList.contains('filled')) computerChoice();
        else round(targetCell, 'O');
    }

    return {round, resetGame};
})();