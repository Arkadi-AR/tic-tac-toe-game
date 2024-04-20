const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');


let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    checkResult();
    togglePlayer();
}

function checkResult() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            const winner = cells[a].textContent;
            showWinner(winner);
            highlightWinningCells(winningCombinations[i]);
            gameActive = false;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        status.textContent = "It's a tie!";
        gameActive = false;
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function showWinner(player) {
    status.textContent = `Player ${player} wins!`;
}

function highlightWinningCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
