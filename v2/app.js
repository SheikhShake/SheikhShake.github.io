const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const resultsPage = document.getElementById("resultsPage");

const startButton = document.getElementById("startButton");

const pokemonImage = document.getElementById("pokemonImage");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const restartButton = document.getElementById("restartButton");
const finalScore = document.getElementById("finalScore");

const points = document.getElementById("score");
const timer = document.getElementById("timer");

const pokeBall1 = document.getElementById("ball1");
const pokeBall2 = document.getElementById("ball2");
const pokeBall3 = document.getElementById("ball3");
const pokeBall4 = document.getElementById("ball4");
const pokeBall5 = document.getElementById("ball5");

const sampleSound = new Audio("./pokemonBattle.mp3");
const correctSound = new Audio("./correctAnswer.mp3");
const wrongSound = new Audio("./wrongAnswer.mp3");
const gameOverSound = new Audio("./gameOverSound.mp3");

const g1 = Array.from(new Array(151), (x, i) => i + 1);
const g2 = Array.from(new Array(100), (x, i) => i + 152);
const g3 = Array.from(new Array(135), (x, i) => i + 252);
const g4 = Array.from(new Array(107), (x, i) => i + 387);
const g5 = Array.from(new Array(156), (x, i) => i + 494);
const g6 = Array.from(new Array(72), (x, i) => i + 650);
const g7 = Array.from(new Array(88), (x, i) => i + 722);
const g8 = Array.from(new Array(96), (x, i) => i + 810);

let pointsTracking,
  actualTimer,
  correctAnswer = "",
  life,
  timerInterval,
  currentPokemons = [];

startButton.addEventListener("click", () => {
  gameStart();
});

restartButton.addEventListener("click", () => {
  gameStart();
});

name1.addEventListener("click", () => {
  checkAnswer(name1);
});

name2.addEventListener("click", () => {
  checkAnswer(name2);
});

name3.addEventListener("click", () => {
  checkAnswer(name3);
});

const buttonStatus = (status) => {
  if (status === "lock") {
    name1.disabled = true;
    name2.disabled = true;
    name3.disabled = true;
  } else {
    name1.disabled = false;
    name2.disabled = false;
    name3.disabled = false;
  }
};

const game = () => {
  document.querySelector("body").style.background = "";

  pokemonImage.classList.add("pokemonImage");

  let i = currentPokemons[Math.floor(Math.random() * currentPokemons.length)];
  let i2 = currentPokemons[Math.floor(Math.random() * currentPokemons.length)];
  let i3 = currentPokemons[Math.floor(Math.random() * currentPokemons.length)];

  pokemonImage.src = "./pokemon_images/" + pokedex[i].image;

  correctAnswer = pokedex[i].name;

  let pokemonNames = [pokedex[i].name, pokedex[i2].name, pokedex[i3].name];

  pokemonImage.classList.remove("hidden");
  name1.classList.remove("hidden");
  name2.classList.remove("hidden");
  name3.classList.remove("hidden");

  name1.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 3), 1);

  name2.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 2), 1);

  name3.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 1), 1);
};

const gameStart = () => {
  currentPokemons = [];
  var all_location_id = document.querySelectorAll(
    'input[name="switch"]:checked'
  );

  var aIds = [];

  for (var x = 0, l = all_location_id.length; x < l; x++) {
    aIds.push(all_location_id[x].value);
  }

  if (aIds.length !== 0) {
    aIds.forEach((g) => {
      if (g === "1") currentPokemons.push(...g1);
      if (g === "2") currentPokemons.push(...g2);
      if (g === "3") currentPokemons.push(...g3);
      if (g === "4") currentPokemons.push(...g4);
      if (g === "5") currentPokemons.push(...g5);
      if (g === "6") currentPokemons.push(...g6);
      if (g === "7") currentPokemons.push(...g7);
      if (g === "8") currentPokemons.push(...g8);
    });

    startButton.hidden = true;
    sampleSound.currentTime = 0;
    sampleSound.play();
    pointsTracking = 0;
    actualTimer = 30;
    timer.innerHTML = actualTimer;

    correctAnswer = "";
    life = 5;

    clearInterval(timerInterval);
    gameOverSound.pause();

    game();
    timerInterval = setInterval(function () {
      if (actualTimer <= 0) {
        clearInterval(timerInterval);
        gameEnd();
      }
      actualTimer -= 1;

      timer.innerHTML = actualTimer;
    }, 1000);

    startPage.classList.add("hidden");
    resultsPage.classList.add("hidden");

    gamePage.classList.remove("hidden");
    timer.classList.remove("hidden");
    pokeBall1.classList.remove("hidden");
    pokeBall2.classList.remove("hidden");
    pokeBall3.classList.remove("hidden");
    pokeBall4.classList.remove("hidden");
    pokeBall5.classList.remove("hidden");
  } else {
    alert("SELECT GEN PLS");
  }
};

const checkAnswer = (userInput) => {
  if (userInput.innerHTML === correctAnswer) {
    pointsTracking += 5;
    actualTimer += 3;
    pokemonImage.classList.remove("pokemonImage");

    userInput.style.background = "green";
    correctSound.play();
  } else {
    if (pointsTracking - 5 < 0) {
      pointsTracking = 0;
    } else {
      pointsTracking -= 5;
    }

    life -= 1;
    if (life === 4) {
      pokeBall5.classList.add("hidden");
    }
    if (life === 3) {
      pokeBall4.classList.add("hidden");
    }
    if (life === 2) {
      pokeBall3.classList.add("hidden");
    }
    if (life === 1) {
      pokeBall2.classList.add("hidden");
    }
    if (life === 0) {
      pokeBall1.classList.add("hidden");
      gameEnd();
    }
    pokemonImage.classList.remove("pokemonImage");
    userInput.style.background = "red";
    wrongSound.play();
  }

  points.innerHTML = pointsTracking;
  setTimeout(() => {
    if (life !== 0) {
      nextRound(userInput);
    }
  }, 1500);
};

const nextRound = (userInput) => {
  userInput.style.background = "white";
  buttonStatus("unlock");
  game();
};

const gameEnd = () => {
  finalScore.innerHTML = pointsTracking;
  pokemonImage.classList.add("hidden");
  name1.classList.add("hidden");
  name2.classList.add("hidden");
  name3.classList.add("hidden");
  timer.classList.add("hidden");
  actualTimer = 0;

  gamePage.classList.add("hidden");

  resultsPage.classList.remove("hidden");
  sampleSound.pause();
  gameOverSound.play();
};

const selectAll = (checked) => {
  if (checked) {
    document.querySelectorAll('input[name="switch"]').forEach((e) => {
      e.checked = true;
    });
  } else {
    document.querySelectorAll('input[name="switch"]').forEach((e) => {
      e.checked = false;
    });
  }
};
