import { useState } from "react";

export default function App() {
  const initialState = {
    playerVal: null,
    computerVal: null,
    playerScore: 0,
    computerScore: 0,
    winner: null,
    gameEnded: false,
    finalPlayerScore: 0,
    finalComputerScore: 0,
  };
  const [state, setState] = useState(initialState);

  function gameLogic(playerVal, computerVal) {
    if (playerVal == computerVal) {
      return 0;
    } else if (
      (playerVal == "ROCK" && computerVal == "SCISSORS") ||
      (playerVal == "PAPER" && computerVal == "ROCK") ||
      (playerVal == "SCISSORS" && computerVal == "PAPER")
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  function scoreCalculator(playerChoice) {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const val = gameLogic(playerChoice, computerChoice);
    if (val === 1) {
      setState((prevState) => ({
        ...prevState,
        playerVal: playerChoice,
        computerVal: computerChoice,
        playerScore: prevState.playerScore + 1,
      }));
    } else if (val == -1) {
      setState((prevState) => ({
        ...prevState,
        playerVal: playerChoice,
        computerVal: computerChoice,
        computerScore: prevState.computerScore + 1,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        computerVal: computerChoice,
        playerVal: playerChoice,
      }));
    }
  }

  function endGame() {
    const { playerScore, computerScore } = state;
    setState({
      ...initialState,
      gameEnded: true,
      winner:
        playerScore > computerScore
          ? "You won!"
          : playerScore < computerScore
          ? "Computer won!"
          : "It's a Draw",
      finalComputerScore: computerScore,
      finalPlayerScore: playerScore,
    });
    return { computerScore, playerScore };
  }

  function determineWinner() {
    const scores = endGame();
  }

  return (
    <>
      <Header />
      <div className="containerClass">
        <div className="actionButtons">
          <button
            className="btn btn-primary"
            onClick={() => scoreCalculator("ROCK")}
          >
            Rock
          </button>
          <button
            className="btn btn-primary"
            onClick={() => scoreCalculator("PAPER")}
          >
            Paper
          </button>
          <button
            className="btn btn-primary"
            onClick={() => scoreCalculator("SCISSORS")}
          >
            Scissors
          </button>
        </div>
        {!state.gameEnded && (
          <div className="gameContent">
            <p>Your choice: {state.playerVal}</p>
            <p>Computer's choice: {state.computerVal}</p>
            <h5>Your score: {state.playerScore}</h5>
            <h5>Computer Score:{state.computerScore} </h5>
          </div>
        )}

        {state.playerVal && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => determineWinner()}
            >
              End game
            </button>
          </div>
        )}
        {state.gameEnded && (
          <div className="endContent">
            <h2>Your Final Score: {state.finalPlayerScore}</h2>
            <h2>Computer Final Score: {state.finalComputerScore}</h2>
            <h1
              className={
                state.winner === "Computer won!"
                  ? `loser`
                  : state.winner === "You won!"
                  ? `winner`
                  : `draw`
              }
            >
              {" "}
              {state.winner}
            </h1>
            <button
              className="btn btn-primary"
              onClick={() => setState(initialState)}
            >
              Rematch
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer__container">
        <p>~Made wholly for learning purposes~</p>

        <i>Chandana Chakilam&copy;2024. </i>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <div className="heading">
      <h1>ROCK, PAPER, SCISSORS</h1>
    </div>
  );
}
