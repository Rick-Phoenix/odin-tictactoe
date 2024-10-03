const li = document.querySelectorAll('li');
let board = new Array(9).fill(null);

li.forEach((item) => {
    item.addEventListener('click', (e) => {
        const id = +e.target.id;
        console.log(id)
        board[id] = e.target.textContent;

    })
})

