import { useState } from "react";
import "./App.css";

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function App() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [status, setStatus] = useState<string>("X's turn");
  const [gameActive, setGameActive] = useState<boolean>(true);

  const handleClick = (index: number) => {
    if (board[index] !== "" || !gameActive) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    checkWinner(updatedBoard);
  };

  const checkWinner = (updatedBoard: string[]) => {
    let win = false;

    for (const [a, b, c] of winningCombos) {
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        win = true;
        break;
      }
    }

    if (win) {
      setStatus(`${currentPlayer} wins!`);
      setGameActive(false);
    } else if (!updatedBoard.includes("")) {
      setStatus("Draw");
      setGameActive(false);
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setStatus(`${nextPlayer}'s turn`);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setStatus("X's turn");
    setGameActive(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="container">
        {board.map((cell, i) => (
          <div
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      <h2 className="status">{status}</h2>
      <button className="restart" onClick={resetGame}>Restart</button>
    </div>
  );
}

export default App;
