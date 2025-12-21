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
//leader board
const winboards = document.getElementById("winboard");
const lossboard = document.getElementById("lossboard");
//others
const audio = document.getElementById("audio");
const loader = document.getElementById("loader");
//player
const YOU = document.getElementById("you");
const OP = document.getElementById("OP");
//star and streak
const star = document.getElementById("star");
const streak = document.getElementById("streakId");

let starscore = 0;
let streakscore = 0;

let winscore = 0;
let lostscores = 0;
let drawScore = 0;

let winboard = 0;
let lostboard = 0;

const choices = ["bato", "gunting", "papel"];
let time = 10;
let interval;

function start() {
  pick.style.display = "none";
  btn.textContent = "Searching player...";
  btn.style.backgroundColor = "transparent";
  btn.style.color = "white";
  loader.style.display = "flex";
  winscore = 0;
  lostscores = 0;
  win.textContent = "0";
  loss.textContent = "0";
  timerDisplay.textContent = "";
  playerDiv.innerHTML = "";
  aiDiv.innerHTML = "";
  setTimeout(() => {
    YOU.textContent = "YOU";
    YOU.classList.add("you");
    OP.classList.add("OP");
    OP.textContent = "OP";
    loader.style.display = "none";
    btn.style.display = "none";
    pick.style.display = "flex";
  }, 4000);
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
      timerDisplay.style.color = "rgb(13, 214, 254)";
    } else if (
      (playerChoice === "bato" && aiChoice === "gunting") ||
      (playerChoice === "gunting" && aiChoice === "papel") ||
      (playerChoice === "papel" && aiChoice === "bato")
    ) {
      winscore++;
      winboard++;
      timerDisplay.textContent = "You Win!";
      win.textContent = winscore;
      timerDisplay.style.color = "green";
    } else {
      lostscores++;
      lostboard++;
      timerDisplay.textContent = "You Lose!";
      loss.textContent = lostscores;
      timerDisplay.style.color = "red";
    }

    //winning system

    // WIN (this round)
    if (winscore === 5) {
      setTimeout(() => {
        starscore += 1;
        streakscore += 1;
        timerDisplay.textContent = "WINNER";
        timerDisplay.style.color = "yellow";
        pick.style.display = "none";
        btn.style.display = "block";
        btn.textContent = "Again";
        btn.style.backgroundColor = "";
        btn.style.color = "black";

        star.textContent = `: ${starscore}`;
        streak.textContent = `: ${streakscore}`;

        saveScore();
      }, 1000);

      // LOSS (this round)
    } else if (lostscores === 5) {
      setTimeout(() => {
        streakscore = 0;
        timerDisplay.textContent = "LOSER";
        timerDisplay.style.color = "red";

        pick.style.display = "none";
        btn.style.display = "block";
        btn.textContent = "Again";
        btn.style.backgroundColor = "";
        btn.style.color = "black";

        streak.textContent = `: ${streakscore}`;
        saveScore();
      }, 1000);
    }
    updateUI();
    saveScore();
  });
}

//stats
const lb = document.getElementById("leaderboard");
const stick = document.getElementById("stick");
const mainbox = document.getElementById("mainbox");

const leaderpoints = document.getElementById("lbpoints");

let show = false;
function showstats() {
  if (!show) {
    mainbox.style.display = "none";
    lb.style.display = "flex";
    leaderboard.style.display = "none";
    btn.style.display = "none";
    show = true;
  } else {
    mainbox.style.display = "flex";
    leaderboard.style.display = "none";
    lb.style.display = "none";
    btn.style.display = "block";
    show = false;

    if (btn.textContent === "Searching player...") {
      btn.style.display = "none";
    }
  }
}
//leaderboard
const leaderboard = document.getElementById("LB");
let reveal = false;
function showboard() {
  if (!reveal) {
    mainbox.style.display = "none";
    leaderboard.style.display = "flex";
    lb.style.display = "none";
    btn.style.display = "none";
    reveal = true;
  } else {
    mainbox.style.display = "flex";
    leaderboard.style.display = "none";
    lb.style.display = "none";
    btn.style.display = "block";
    reveal = false;

    if (btn.textContent === "Searching player...") {
      btn.style.display = "none";
    }
  }
}
//localsaving
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("points"));
  if (saved) {
    winboard = saved.win;
    lostboard = saved.loss;
    drawScore = saved.draw;
    starscore = saved.star || 0;
    streakscore = saved.streak || 0;

    updateUI();
  }
});

function saveScore() {
  const data = {
    win: winboard,
    loss: lostboard,
    draw: drawScore,
    star: starscore,
    streak: streakscore,
  };
  localStorage.setItem("points", JSON.stringify(data));
}

function updateUI() {
  winboards.textContent = `Win: ${winboard}`;
  lossboard.textContent = `Loss: ${lostboard}`;
  draw.textContent = `Draw: ${drawScore}`;
  star.textContent = `: ${starscore}`;
  streak.textContent = `: ${streakscore}`;
  leaderpoints.textContent = `: ${starscore}`;
}
