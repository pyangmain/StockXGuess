import {useState} from 'react';
import './App.css';

export default function Game() {
  const [gameState, setGameState] = useState("start") // start -> display -> guess -> result -- x10 -> end
  const [sneakerArray, setSneakerArray] = useState(Array(10));
  const [round, setRound] = useState(-1);
  const [score, setScore] = useState(0);

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
    console.log("sneaker:" + sneakerArray);
    return (
      <div>
        <div id="header-div" className="header-div">
            <h1 id="level-counter" className="level-counter">{round}/10</h1>
            <h1 id="score" className="score">SCORE: {score}</h1>
        </div>
        <div id="game-div" className="game-div">
            <h2 id="sneaker-title"></h2>
            <img id="sneaker-img" src={sneakerArray[round - 1].imgUrl} className="sneaker-img"></img>
        </div>
        <button id="guess-button" className="fixed-green-button" >Guess</button>
      </div>
    );
  }
  function renderGuess() {
    return (
      <div>
        guess.
      </div>
    )
  }

  function renderResult() {
    return (
      <div>
        result.
      </div>
    )
  }

  function renderEnd() {
    return (
      <div>
        End.
      </div>
    )
  }
  function renderBasedOnGameState() {
    console.log("thing: " + sneakerArray);
    if(gameState == "start") {
      return renderStart();
    }
    if(gameState == "display") {
      return renderDisplay();
    }
    if(gameState == "guess") {
      return renderGuess();
    }
    if(gameState == "result") {
      return renderResult();
    }
    if(gameState == "end") {
      return renderEnd();
    }

    return(<div>
      Vitaly voice: You fucked up!
    </div>)
  }
  return (renderBasedOnGameState());
}

