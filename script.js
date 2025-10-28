const suits = ["clubs", "diamonds", "hearts", "spades"];
const ranks = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "jack", value: 2 },
  { name: "queen", value: 3 },
  { name: "king", value: 4 },
  { name: "ace", value: 11 }
];

let deck = [];
suits.forEach(suit => {
  ranks.forEach(rank => {
    deck.push({
      name: `${rank.name}_of_${suit}`,
      value: rank.value,
      img: `${rank.name}_of_${suit}.png`
    });
  });
});

let userScore = 0;
let compScore = 0;
let round = 1;

let userName = prompt("Введіть ваше ім'я:");

while (userName === null || userName.trim() === "") {
  userName = prompt("Ім'я є обов'язковим! Введіть своє ім'я або псевдонім:");
}

document.getElementById('userName').textContent = userName;


const generateBtn = document.getElementById("generateBtn");
const restartBtn = document.getElementById("restartBtn");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

generateBtn.addEventListener("click", playRound);
restartBtn.addEventListener("click", restartGame);
closeModal.addEventListener("click", () => modal.style.display = "none");

function playRound() {
  if (round > 3) return;

  const userCard = deck[Math.floor(Math.random() * deck.length)];
  const compCard = deck[Math.floor(Math.random() * deck.length)];

  userScore += userCard.value;
  compScore += compCard.value;

  document.getElementById("userScore").textContent = userScore;
  document.getElementById("compScore").textContent = compScore;
  document.getElementById("userCard").src = "cards/" + userCard.img;
  document.getElementById("compCard").src = "cards/" + compCard.img;
  document.getElementById("round").textContent = `Спроба ${round} з 3`;

  round++;

  if (round > 3) showResult();
}

function showResult() {
  let message = "";

  if (userScore > compScore) {
    message = `${userName}, ви виграли!`;
  } else if (userScore < compScore) {
    message = `Цього разу ви програли.`;
  } else {
    message = "Нічия!";
  }

  modal.style.display = "block";
  modalText.textContent = message;

  generateBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  userScore = 0;
  compScore = 0;
  round = 1;

  document.getElementById("userScore").textContent = 0;
  document.getElementById("compScore").textContent = 0;
  document.getElementById("round").textContent = "Спроба 1 з 3";
  document.getElementById("userCard").src = "cards/back.png";
  document.getElementById("compCard").src = "cards/back.png";

  modal.style.display = "none";
  generateBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
}
