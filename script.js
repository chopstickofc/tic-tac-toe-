document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    // Function to handle cell click
    function cellClick(index) {
        if (gameboard[index] === '' && currentPlayer === 'X' && !checkWinner()) {
            gameboard[index] = currentPlayer;
            render();
            if (!checkWinner()) {
                currentPlayer = 'O';
                setTimeout(aiMove, 500); // Delay AI move for better user experience
            }
        }
    }

    // Function for AI move
    function aiMove() {
        let emptyCells = gameboard.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);

        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        gameboard[emptyCells[randomIndex]] = 'O';
        render();
        if (!checkWinner()) {
            currentPlayer = 'X';
        }
    }

    // Function to render the board
    function render() {
        gameboard.forEach((value, index) => {
            document.querySelector(`.cell[data-index="${index}"]`).textContent = value;
        });
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                alert(`${gameboard[a]} wins!`);
                return true;
            }
        }

        if (gameboard.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            return true;
        }

        return false;
    }

    // Event listener for the reset button
    resetButton.addEventListener('click', () => {
        currentPlayer = 'X';
        gameboard = ['', '', '', '', '', '', '', '', ''];
        render();
    });
});
