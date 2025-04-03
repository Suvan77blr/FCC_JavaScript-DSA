
let playerScore = 0;
let computerScore = 0;

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");

const winnerMsgElement = document.getElementById("winner-msg");
winnerMsgElement.innerText = "";
const optionsContainer = document.querySelector("#options-container");
roundResultsMsg.innerText = "";

// Button references.
const resetGameBtn = document.getElementById("reset-game-btn");
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

let getRandomComputerResult = () => {
    const options = ["Rock", "Paper", "Scissors"];
    let rndmIndex = Math.floor(Math.random() * options.length);
    return options[rndmIndex];
};

let hasPlayerWonTheRound = (player, computer) => {

    return (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Paper") ||
        (player === "Paper" && computer === "Rock")
    );
};

// console.log(hasPlayerWonTheRound("Rock", "Scissors")); 
// console.log(hasPlayerWonTheRound("Scissors", "Rock")); 

let getRoundResults = (userOption) => {
    const computerResult = getRandomComputerResult();

    const result = hasPlayerWonTheRound(userOption, computerResult);

    if(result) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    }
    else if (computerResult === userOption) {
        return `It's a tie! Both chose ${userOption}`;
    }
    else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
};

// console.log(getRoundResults("Rock"));
// console.log("Player Score: ", playerScore, "Computer Score: ", computerScore);


let showResults = (userOption) => {
    roundResultsMsg.innerText = getRoundResults(userOption);
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;

    if (playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${
            playerScore === 3 ? "Player" : "Computer"
        } has won the game!`;

        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
    }
};

let resetGame = () => {
    playerScore = computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;

    winnerMsgElement.innerText = "";
    roundResultsMsg.innerText = "";

    resetGameBtn.style.display = "none";
    optionsContainer.style.display = "block";
}


// resetGameBtn.addEventListener("click", resetGame);
// rockBtn.addEventListener('click', showResults("Rock"));
// paperBtn.addEventListener("click", showResults("Paper"));
// scissorsBtn.addEventListener("click", showResults("Scissors"));

resetGameBtn.addEventListener("click", resetGame);
rockBtn.addEventListener('click', () => {
    showResults("Rock")
});
paperBtn.addEventListener("click", () => {
    showResults("Paper")
});
scissorsBtn.addEventListener("click", () => {
    showResults("Scissors")
});