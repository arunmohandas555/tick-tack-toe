import { useState } from 'react';
import Square from './Sqaure';

const Board = () => {

	// set up hooks to handle state
    const [squares, updateSqaures]  = useState([]);
    const [whoIsNext, setWhoIsNext] = useState('X');
	const [gameStatus, setGameStatus] = useState('Next turn X');

    const handleClick = (i) => {
        
		console.log('click detected in board at '+ i);

		// if cell already selected or game completed then ignore the click
		if(squares[i] || calculateWinner(squares)) return;
		
		let newSquares = [...squares];
		newSquares[i] = whoIsNext;
		updateSqaures(newSquares);
		
		let winner = calculateWinner(newSquares);
		
		if(winner) {
			setGameStatus('Winner '+ winner);
			return;
		}

		if(whoIsNext == 'X') {
			setWhoIsNext('O');
			setGameStatus('Next turn O');
		}
		else {
			setWhoIsNext('X');
			setGameStatus('Next turn X');
		}

    }
	const renderSquare = (i) => {
		return <Square value={squares[i]} onClick={() => handleClick(i)}/>;
	}

	function calculateWinner(squares) {
		const lines = [
		  [0, 1, 2],
		  [3, 4, 5],
		  [6, 7, 8],
		  [0, 3, 6],
		  [1, 4, 7],
		  [2, 5, 8],
		  [0, 4, 8],
		  [2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
		  const [a, b, c] = lines[i];
		  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		  }
		}
		return null;
	  }

	return (
		<div className="Board">
			{ [0,1,2].map((row) => {
				return (
					<div>
						{[0,1,2].map((col) => renderSquare(row*3+col))}
					</div>
				);
			})}

			<div>{gameStatus}</div>
		</div>
		
	);
};

export default Board;