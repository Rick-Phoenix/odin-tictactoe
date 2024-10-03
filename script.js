const li = document.querySelectorAll('li');

li.forEach((item) => {
    item.addEventListener('click', function() {
        game.round(this, 'X');
    })
})

const game = (() => {
    let board = new Array(9).fill(null);

    const round = (cell, symbol) => {
        if (cell.classList.contains('filled')) return;
        const id = +cell.id;
        cell.textContent = symbol;
        board[id] = symbol;
        cell.classList.add('filled');
        console.log('done')
        checkWin(symbol);
        if (symbol == 'X') computerChoice();
    }

    const checkWin = (symbol) => {
        const winningCombinations = [[0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8]];
        const filledCells = board.reduce((acc, cell, index) => {
            if (cell == symbol) acc.push(index);
            return acc;
        }, [])
        
        for (comb of winningCombinations) {
            if (filledCells.includes(comb[0]) && filledCells.includes(comb[1]) && filledCells.includes(comb[2])) {
                console.log('Yes');
                resetGame();
            }
        }
    }

    const resetGame = () => {
        li.forEach((item) => {
            item.classList.remove('filled');
            item.textContent = '';
            board = new Array(9).fill(null);
        });
    }

    const computerChoice = () => {
        const choice = (Math.floor(Math.random() * 9));
        const targetCell = document.getElementById(`${choice}`);
        if (targetCell.classList.contains('filled')) computerChoice();
        else round(targetCell, 'O');
    }

    return {round};
})();