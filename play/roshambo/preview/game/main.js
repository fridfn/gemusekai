const choicesArena = document.querySelector(".choices-arena")
const choicesBattle = document.querySelector(".choices-battle")

const playerChoiceElement = document.querySelector("#player-choice .choice-box img")
const computerChoiceElement = document.querySelector("#computer-choice .choice-box img")

const handsChoice = {
  rock: "rock.svg",
  paper: "paper.svg",
  scissors: "scissors.svg"
};

const handleChoice = (playerChoice, computerChoice) => {
  let result = "";
  if (playerChoice === computerChoice) {
    result = "It's a Draw! 😐";
    drawCount++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "Congrats, You Won! 🎉";
    winCount++;
  } else {
    result = "You Lost! 😭";
    lostCount++;
  }
  
  return result
}

let winCount = 0, lostCount = 0, drawCount = 0;
function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  
  const elementChoice = document.querySelectorAll(".choices-battle .choices-container .choice")
  
  const result = handleChoice(playerChoice, computerChoice)
  
  choicesArena.classList.add("arena")
  choicesBattle.classList.add("battle")
  elementChoice.forEach((items) => items.classList.add("suit-hand"))
  
  setTimeout(() => {
    computerChoiceElement.src = `assets/${handsChoice[computerChoice]}`
    playerChoiceElement.src = `assets/${handsChoice[playerChoice]}`
    
    document.getElementById("result").textContent = result;
    elementChoice.forEach((items) => items.classList.remove("suit-hand"))
  }, 2000)
  
  document.getElementById("won").textContent = winCount;
  document.getElementById("lost").textContent = lostCount;
  document.getElementById("draw").textContent = drawCount;
}

function reset() {
  [computerChoiceElement, playerChoiceElement].forEach(items => items.src = "assets/rock.svg")
  
  choicesArena.classList.remove("arena")
  choicesBattle.classList.remove("battle")
}