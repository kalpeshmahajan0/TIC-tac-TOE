// Get references to the important elements
const playerText = document.getElementById('playerText');
const restartBtn = document.getElementById('restartBtn');
const boxes = Array.from(document.getElementsByClassName('box'));
let click = new Audio('pop_sound.mp3');
let gameover = new Audio('gameover.mp3');
let win = new Audio('win.mp3');
let draw = new Audio('draw.mp3');
let sr = new Audio('sr.mp3');

// Game setup
const X = "X";
const O = "O";
let currentPlayer = X;
let spaces = Array(9).fill(null);
let gameOver = false;
let timer; // Timer variable
let timeLimit = 10; // seconds
let countdownInterval;


// All possible ways to win
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

// Start the game
function startGame() {
    boxes.forEach((box, index) => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.color = 'var(--voilet)';
        box.addEventListener('click', () => handleClick(index), { once: true });
    });

    spaces.fill(null);
    playerText.innerText = "Tic Tac Toe";
    currentPlayer = X;
    gameOver = false;
}

// Handle a box click
function handleClick(index) {
    if (spaces[index] || gameOver) return;

    spaces[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;
    click.play();

    // Check if someone has won
    const winner = checkWinner();
    if (winner) {
        playerText.innerText = `${currentPlayer} wins!`;
        winner.forEach(i => boxes[i].style.backgroundColor = 'var(--winning-blocks)');
        win.play();
        gameOver = true;
        return;
    }

    // Check if it's a draw
    if (!spaces.includes(null)) {
        playerText.innerText = "It's a draw!";
        boxes.forEach(box => box.style.color = '#888');
        draw.play();
        gameOver = true;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === X ? O : X;
}

// Check for a winner
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return combo;
        }
    }
    return null;
    
}

// Restart the game
restartBtn.addEventListener('click', startGame);
sr.play();


// Start the game when the page loads
startGame();
