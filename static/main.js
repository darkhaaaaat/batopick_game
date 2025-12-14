const playerDiv = document.getElementById("player");
const aiDiv = document.getElementById("AI");
const pick = document.getElementById("option");
const btn = document.getElementById("btn");
const timerDisplay = document.getElementById("timer");
const win = document.getElementById("win");
const loss = document.getElementById("loss");
const draw = document.getElementById("draw");
const points = document.getElementById("points");
const header = document.getElementById("header");

const audio = document.getElementById("audio");

let winscore = 0;
let lostscores = 0;
let drawScore = 0;
let scoresave = points.innerHTML;

const choices = ["bato", "gunting", "papel"];
let time = 10;
let interval;

function start() {
  pick.style.display = "flex";
  btn.style.display = "none";
}

function timer(callback) {
  clearInterval(interval);
  time = 3;
  timerDisplay.textContent = time;

  interval = setInterval(() => {
    time--;

    timerDisplay.textContent = time;
    if (time <= 0) {
      clearInterval(interval);
      playerDiv.classList.add("animate");
      aiDiv.classList.add("animate");

      setTimeout(callback, 1000);
    }
  }, 1000);
}
function playOrRestart() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function bato() {
  choose("bato");
  playOrRestart();
}
function gunting() {
  choose("gunting");
  playOrRestart();
}
function papel() {
  choose("papel");
  playOrRestart();
}

function choose(playerChoice) {
  playerDiv.innerHTML = "";
  aiDiv.innerHTML = "";

  const fistPlayer = document.createElement("img");
  fistPlayer.src = "static/elements/bato.png";
  playerDiv.appendChild(fistPlayer);

  const fistAI = document.createElement("img");
  fistAI.src = "static/elements/ai bato.png";
  aiDiv.appendChild(fistAI);

  timer(() => {
    playerDiv.classList.remove("animate");
    aiDiv.classList.remove("animate");

    fistPlayer.src = `static/elements/${playerChoice}.png`;

    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    fistAI.src = `static/elements/ai ${aiChoice}.png`;

    if (playerChoice === aiChoice) {
      drawScore++;
      timerDisplay.textContent = "Draw!";
      draw.textContent = `draw: ${drawScore}`;
      timerDisplay.style.color = "rgb(38, 192, 38";
    } else if (
      (playerChoice === "bato" && aiChoice === "gunting") ||
      (playerChoice === "gunting" && aiChoice === "papel") ||
      (playerChoice === "papel" && aiChoice === "bato")
    ) {
      winscore++;
      timerDisplay.textContent = "You Win!";
      win.textContent = `Win: ${winscore}`;
      timerDisplay.style.color = "green";
    } else {
      lostscores++;
      timerDisplay.textContent = "You Lose!";
      loss.textContent = `Lost: ${lostscores}`;
      timerDisplay.style.color = "red";
    }
    updateUI();
    saveScore();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("points"));
  if (saved) {
    winscore = saved.win;
    lostscores = saved.loss;
    drawScore = saved.draw;

    updateUI();
  }
});

function saveScore() {
  const data = {
    win: winscore,
    loss: lostscores,
    draw: drawScore,
  };
  localStorage.setItem("points", JSON.stringify(data));
}

function updateUI() {
  win.textContent = `Win: ${winscore}`;
  loss.textContent = `Lost: ${lostscores}`;
  draw.textContent = `draw: ${drawScore}`;
}
