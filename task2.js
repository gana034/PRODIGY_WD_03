document.addEventListener('DOMContentLoaded', function() {
    const player1 = 'X';
    const player2 = 'O';
    let currentPlayer = player1;
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const cells = document.querySelectorAll('.cell');
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', function() {
        handleMove(cell, index);
      });
    });
  
    function handleMove(cell, cellIndex) {
      if (!gameActive || cell.innerText !== '') return;
  
      gameState[cellIndex] = currentPlayer;
      cell.innerText = currentPlayer;
  
      if (checkWin()) {
        document.getElementById('status').innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
  
      if (checkDraw()) {
        document.getElementById('status').innerText = 'It\'s a draw!';
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      document.getElementById('status').innerText = `Next player: ${currentPlayer}`;
    }
  
    function checkWin() {
      return winningConditions.some(condition => {
        return condition.every(index => {
          return gameState[index] === currentPlayer;
        });
      });
    }
  
    function checkDraw() {
      return gameState.every(cell => cell !== '');
    }
  
    function resetGame() {
      gameActive = true;
      currentPlayer = player1;
      gameState = ['', '', '', '', '', '', '', '', ''];
      document.getElementById('status').innerText = `Next player: ${currentPlayer}`;
      cells.forEach(cell => {
        cell.innerText = '';
      });
    }
    
    document.getElementById('reset').addEventListener('click', resetGame);
  });
  