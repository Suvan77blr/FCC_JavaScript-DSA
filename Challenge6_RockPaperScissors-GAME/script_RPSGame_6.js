

let getRandomComputerResult = () => {
    const options = ["Rock", "Paper", "Scissors"];
    let rndmIndex = Math.floor(Math.random() * options.length);
    return options[rndmIndex];
};

let hasPlayerWonTheRound = (player, computer) => {
    // if(player=="Rock" && computer=="Scissors")
    //     return true;
    // else if(player=="Scissors" && computer=="Paper")
    //     return true;
    // else if(player=="Paper" && computer=="Rock")
    //     return true;
    // else return false;

    return (
        (player=="Rock" && computer=="Scissors") ||
        (player=="Scissors" && computer=="Paper") ||
        (player=="Paper" && computer=="Rock")
    );
};

// console.log(hasPlayerWonTheRound("Rock", "Scissors")); 
// console.log(hasPlayerWonTheRound("Scissors", "Rock")); 

let playerScore = 0;
let computerScore = 0;

let getRoundResults = (userOption) => {
    const computerResult = getRandomComputerResult();

    if(computerResult === userOption) {
        return `It's a tie! Both chose ${userOption}`;
    }

    const result = hasPlayerWonTheRound(userOption, computerResult);

    if(result) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    }
    else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
};


console.log(getRoundResults("Rock"));
console.log("Player Score: ", playerScore, "Computer Score: ", computerScore);