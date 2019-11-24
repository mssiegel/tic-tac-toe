import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const initialBoard = ['','','','','','','','','']
  const [board, setBoard] = useState(initialBoard)
  const [previousBoards, setPreviousBoards] = useState([])
  const [player, setPlayer] = useState("X")
  const [gameInProgress, setGameInProgess] = useState(false)
  const [winningMessage, setWinningMessage] = useState('')

  useEffect(() => {
    checkForWin()
  })

  function restartBoard() {
    setBoard(initialBoard)
    setPreviousBoards([])
    setPlayer("X")
    setGameInProgess(false)
    setWinningMessage('')
  }

  function undo() {
    if (previousBoards.length === 1) restartBoard()
    else {
      setBoard(previousBoards[previousBoards.length-1])
      setPreviousBoards(previousBoards.slice(0, previousBoards.length-1))
      setPlayer(player === "X" ? "O" : "X")
    }
  }

  function addClick(i) {
    if (!winningMessage){
    setGameInProgess(true)
    setPreviousBoards([...previousBoards, board])
      if (board[i] === '') {
        setBoard(board.map((square, index) => {
          if (i === index) return player
          else return square
        }))
        setPlayer(player === "X" ? "O" : "X")
      }
    }
  }


  function checkForWin() {
    /*
      0  1  2
      3  4  5
      6  7  8
    */
    //horizontal - DONE
    for (let i = 0; i < 9; i += 3) 
      if (board[i] && board[i+1] === board[i] && board[i+2] === board[i]) {
        setWinningMessage(`${board[i]} won horizontally`)
        return
      }
     
    //vertical
    for (let i = 0; i < 3; i++) 
      if (board[i] && board[i+3] === board[i] && board[i+6] === board[i]) {
      setWinningMessage(`${board[i]} won vertically`)
      return
    }
     
    //topLeft - bottomRight
    if (board[0] && board[4] === board[0] && board[8] === board[0]) {
      setWinningMessage(`${board[0]} won diagonally`)
      return
    }
    
    //bottomLeft - topRight
    if (board[6] && board[4] === board[6] && board[2] === board[6]) {
      setWinningMessage(`${board[6]} won diagonally`)
      return
    }

    if (board.filter(square => square === '').length === 0) setWinningMessage("Tie game!")
    else setWinningMessage('')
  }

  return (
    <div className="App">
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {board.map((square, i) => 
          <div key={i} className="square" onClick={() => addClick(i)}>{square}</div>)}
      </div>
      {winningMessage && <span  className="winning-message">{winningMessage}</span>}
      <div className={"buttons "  + (gameInProgress ? '': 'hidden')}>
        <button className="undo" onClick={undo}>Undo</button>
        <button className={"restart-button"} onClick={restartBoard}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;
