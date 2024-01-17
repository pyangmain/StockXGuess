import {useState} from 'react';
import './App.css';

export default function Game() {
  const [gameState, setGameState] = useState("start"); // start -> display -> guess -> result -- x10 -> end
  const [sneakerArray, setSneakerArray] = useState(Array(10));
  const [round, setRound] = useState(-1);
  const [score, setScore] = useState(0);
  const [guessInput, setGuessInput] = useState('');
  const [pointsGained, setPointsGained] = useState(0);
  const initGame = () => {
    fetch("http://localhost:8080/api/v1/sneaker/getTopTen")
    .then((response) => {
      if(!response.ok) {
        console.log("response from db not good");
      }
      return response.json();
    }).then((data) => {
      setSneakerArray(data);
      setRound(1);
      setScore(0);
    }).then(() => {
      setGameState("display");
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var userGuess;
    if(guessInput === NaN) {
      userGuess = 0;
    }
    else {
      userGuess = parseInt(guessInput);
    }
    var gainedPoints = Math.max(0, Math.floor(1000 - Math.pow(Math.abs(parseInt(userGuess) - sneakerArray[round - 1].price), 1.38)));
    console.log(gainedPoints);
    setPointsGained(gainedPoints);
    setScore(score + gainedPoints);
    setGameState("result");
  }

  const advanceRound = () => {
    if(round === 10) {
      setGameState("end");
    }
    else {
      setRound(round + 1);
      setGuessInput('');
      setGameState("display");
    }
  }

  function renderStart() {
    return (
      <div className="centered-div">
                <h1>Stock</h1>
                <h1 className="stockXgreen">XGame</h1> 
                <p>How well do you know your sneakers? Test out your shoe knowledge by pressing play below.</p>
                <p className="QUICKSAND">Here's how the game works: We give you 10 random shoes on StockX, and you have to guess the price. The closer the guess to the average selling price, the more points you get.</p>
                <p>Idea inspired from <a href="https://www.guessense.com/">GUESSENSE.</a></p>
                <div className="centered-div">
                    <button id="start-button" className="green-button" onClick={initGame}>Start</button>
                </div>
        </div>
    )
  }
  function renderDisplay() {
    return (
      <div>
        <div id="header-div" className="header-div">
            <h1 id="level-counter" className="level-counter">{round}/10</h1>
            <h1 id="score" className="score">SCORE: {score}</h1>
        </div>
        <div id="game-div" className="game-div">
            <h2 id="sneaker-title">{sneakerArray[round - 1].sneakerName}</h2>
            <img id="sneaker-img" src={sneakerArray[round - 1].imgUrl} className="sneaker-img"></img>
        </div>
        <button id="guess-button" className="fixed-green-button" onClick={() => {setGameState("guess")}}>Guess</button>
      </div>
    );
  }

  function renderGuess() {
    return (
      <div>
        <div id="header-div" className="header-div">
            <h1 id="level-counter" className="level-counter">{round}/10</h1>
            <h1 id="score" className="score">SCORE: {score}</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <input 
                min = "0"
                max = "10000"
                placeholder="$USD"
                type="number" 
                value={guessInput} 
                onChange={(e) => {setGuessInput(e.target.value)}} 
            />
        <button id="guess-button" className="fixed-green-button">Submit</button>
        </form>
      </div>
    );
  }

  function renderResult() {
    return (
      <div>
        <div id="header-div" className="header-div">
            <h1 id="level-counter" className="level-counter">{round}/10</h1>
            <h1 id="score" className="score">SCORE: {score}</h1>
        </div>
        <div id="text-div" className="text-div">
            <a href={sneakerArray[round - 1].sneakerUrl} id="product-link"><h2 id="product-text">Link to shoes</h2></a>
            <h2 id="shoe-price">{sneakerArray[round - 1].price}</h2>
            <h2 id="player-answer">{guessInput}</h2>
            <h2 id="points-gained">{pointsGained}</h2>
        </div>
        <button id="guess-button" className="fixed-green-button" onClick={advanceRound}>Continue</button>
      </div>
    );
  }

  function renderEnd() {
    return (
      <div>
        <div id="final-message">
                <h2>GAME OVER</h2>
                <h2 id="final-score">Final Score: {score}</h2>
            </div>
        <button id="guess-button" className="fixed-green-button" onClick={initGame}>Play Again</button>
      </div>
    );
  }
  function renderBasedOnGameState() {
    if(gameState === "start") {
      return renderStart();
    }
    if(gameState === "display") {
      return renderDisplay();
    }
    if(gameState === "guess") {
      return renderGuess();
    }
    if(gameState === "result") {
      return renderResult();
    }
    if(gameState === "end") {
      return renderEnd();
    }

    return(<div>
      Vitaly voice: You fucked up!
    </div>)
  }
  return (renderBasedOnGameState());
  
}

