const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Create the board
function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.style.color = currentPlayer === "X" ? "#ff4b5c" : "#1dd1a1";

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    animateWin();
  } else if (!gameState.includes("")) {
    statusText.textContent = "😮 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check winning combinations
function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winConditions.some(condition =>
    condition.every(index => gameState[index] === currentPlayer)
  );
}

// Animate winning cells
function animateWin() {
  const cells = document.querySelectorAll(".cell");
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  winConditions.forEach(condition => {
    if (condition.every(i => gameState[i] === currentPlayer)) {
      condition.forEach(i => {
        cells[i].style.background = "linear-gradient(45deg, #ff9a9e, #fad0c4)";
        cells[i].style.transform = "scale(1.2)";
        cells[i].style.transition = "all 0.5s ease";
      });
    }
  });
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

// Initialize
createBoard();
