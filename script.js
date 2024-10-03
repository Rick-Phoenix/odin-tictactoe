const li = document.querySelectorAll('li');
let board = new Array(9).fill(null);
winningCombinations = [[0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8]];

li.forEach((item) => {
    item.addEventListener('click', function() {
        game(this, 'X');
    })
})


function game(cell, symbol) {
    if (cell.classList.contains('filled')) return;
    const id = +cell.id;
    cell.textContent = symbol;
    board[id] = symbol;
    cell.classList.add('filled');
    console.log('done')
    checkWin(symbol);
}

function checkWin(symbol) {
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

function resetGame() {
    li.forEach((item) => {
        item.classList.remove('filled');
        item.textContent = '';
    })
}