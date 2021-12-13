const clearBtn = document.querySelector('#clear')
const board = document.querySelector('#board')
const cells = document.querySelectorAll('.cell')
const grid = ['', '', '', '', '', '', '', '', '']
const GRID_SIZE = 3
let turn = 'X'

function changeTurn() {
    return turn == 'X' ? 'O' : 'X'
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Array.prototype.indexOf.call(cells, cell)
        cell.innerHTML = turn

        grid[index] = cell.innerHTML
        cell.classList.add('disabled')
        turn = changeTurn(turn)

        if (!grid.includes('')) finishGame()
        checkWin()
    })
})

clearBtn.addEventListener('click', (event) => {
    cells.forEach(cell => {
        turn = 'X'
        cell.innerHTML = ''
        cell.classList.remove('disabled')

        for (let i = 0; i < grid.length; i++)
            if (grid[i] !== '') 
                grid[i] = ''
    })
    
    const node = board.querySelector('.title')
    if (node)
        board.removeChild(node)
})

function finishGame() {
    cells.forEach(cell => {
        cell.classList.add('disabled')
    })

    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = 'Game finished!'
    cells[cells.length - 1].after(title)
}

function checkWin() {
    // rows
    check(0, 1)
    check(3, 1)
    check(6, 1)

    // columns
    check(0, 3)
    check(1, 3)
    check(2, 3)
    
    // diagonals
    check(0, 4)
    check(2, 2)
}

function check(i, j) {
    const string = []
    string.push(grid[i + j * 0], grid[i + j * 1], grid[i + j * 2])
    checkCombo(string)
}

function checkCombo(string) {
    if(string.join('') === 'XXX' || string.join('') === 'OOO') finishGame()
}