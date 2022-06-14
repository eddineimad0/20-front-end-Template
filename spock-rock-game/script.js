import { startConfetti,stopConfetti,removeConfetti } from "./confetti.js";
const playerScoreEl = document.getElementById("player_score");
const playerChoiceEl = document.getElementById("player_choice");
const computerScoreEl = document.getElementById("computer_score");
const computerChoiceEl = document.getElementById("computer_choice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("player_rock");
const playerPaper = document.getElementById("player_paper");
const playerScissors = document.getElementById("player_scissors");
const playerLizard = document.getElementById("player_lizard");
const playerSpock = document.getElementById("player_spock");

const computerRock = document.getElementById("computer_rock");
const computerPaper = document.getElementById("computer_paper");
const computerScissors = document.getElementById("computer_scissors");
const computerLizard = document.getElementById("computer_lizard");
const computerSpock = document.getElementById("computer_spock");

const allGameIcons = document.querySelectorAll(".far");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};
let playerScoreNumber;
let computerScoreNumber;
let computerChoice = "";

//functions

//reset icons color
function resetIcons() {
  stopConfetti();
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}
function resetAll() {
  removeConfetti();
  localStorage.removeItem("playerScore");
  localStorage.removeItem("computerScore");
  setupGame();
  resetIcons();
}
window.resetAll=resetAll;
function computerRandomChoice() {
  const randomNumber = Math.random();
  if (randomNumber < 0.2) {
    computerChoice = "rock";
  } else if (randomNumber <= 0.4) {
    computerChoice = "paper";
  } else if (randomNumber <= 0.6) {
    computerChoice = "scissors";
  } else if (randomNumber <= 0.8) {
    computerChoice = "lizard";
  } else {
    computerChoice = "spock";
  }
}
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie";
    return;
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) + 1) {
      startConfetti();
      resultText.textContent = "You Win !";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      return;
    } else {
      resultText.textContent = "You Lose !";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      return;
    }
  }
}
function displayComputerChoice() {
  switch (computerChoice) {
    case "rock":
      computerRock.classList.add("selected");
      computerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      computerPaper.classList.add("selected");
      computerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      computerScissors.classList.add("selected");
      computerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      computerLizard.classList.add("selected");
      computerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      computerSpock.classList.add("selected");
      computerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
}
//call function to process turn
function checkResult(playerChoice) {
  resetIcons();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}
// updating selected icon and user choice
function select(choiceParam) {
  checkResult(choiceParam);
  switch (choiceParam) {
    case "rock":
      playerRock.classList.add("selected");
      playerChoiceEl.textContent = " --- Rock";
      break;
    case "paper":
      playerPaper.classList.add("selected");
      playerChoiceEl.textContent = " --- Paper";
      break;
    case "scissors":
      playerScissors.classList.add("selected");
      playerChoiceEl.textContent = " --- Scissors";
      break;
    case "lizard":
      playerLizard.classList.add("selected");
      playerChoiceEl.textContent = " --- Lizard";
      break;
    case "spock":
      playerSpock.classList.add("selected");
      playerChoiceEl.textContent = " --- Spock";
      break;
    default:
      break;
  }
  localStorage.setItem("playerScore", playerScoreNumber);
  localStorage.setItem("computerScore", computerScoreNumber);
}
window["select"]=select;
function setupGame() {
  playerScoreNumber = localStorage.getItem("playerScore")
    ? localStorage.getItem("playerScore")
    : 0;
  computerScoreNumber = localStorage.getItem("computerScore")
    ? localStorage.getItem("computerScore")
    : 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  resultText.textContent = "";
  computerChoiceEl.textContent = "";
  playerChoiceEl.textContent = "";
}

//main
setupGame();