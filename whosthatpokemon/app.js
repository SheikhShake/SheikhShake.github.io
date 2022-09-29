console.log(pokedex[0]);

/*

Open game
Main page - Have start button
Game page - Game page should display pokemon pic.

Flow 
    - Game data, contains 151 pokemon characters
    - On start button, display Pokemon pic, countdown timer and pokeball life
    - Display 2 wrong and 1 correct answer
    - If user select correct answer
        - increase time countdown. 
    - else
        - decrease time and pokeball life

*/

// variables

//pages
const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const resultsPage = document.getElementById("resultsPage");

const startButton = document.getElementById("startButton");
const pokemonImage = document.getElementById("pokemonImage"); // <img ... />
const pokemonImage2 = document.getElementById("pokemonImage2");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const restartButton = document.getElementById("restartButton");
const finalScore = document.getElementById("finalScore");
// const answerImage

const points = document.getElementById("score");
const timer = document.getElementById("timer");
// const boxTimer = document.getElementById("boxTimer");

const pokeBall1 = document.getElementById("ball1");
const pokeBall2 = document.getElementById("ball2");
const pokeBall3 = document.getElementById("ball3");
const pokeBall4 = document.getElementById("ball4");
const pokeBall5 = document.getElementById("ball5");

// sounds

const sampleSound = new Audio("./pokemonBattle.mp3");
const correctSound = new Audio("./correctAnswer.mp3");
const wrongSound = new Audio("./wrongAnswer.mp3");
const gameOverSound = new Audio("./gameOverSound.mp3");

let pointsTracking,
  actualTimer,
  correctAnswer = "",
  life,
  timerInterval;

startButton.addEventListener("click", () => {
  gameStart();
  startButton.hidden = true;
  //dim background
});

restartButton.addEventListener("click", () => {
  // restartButton.disabled = true;
  gameStart("restart");
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

  let rand = Math.floor(Math.random() * 800);
  let rand2 = Math.floor(Math.random() * 800);
  let rand3 = Math.floor(Math.random() * 800);
  pokemonImage.src = pokedex[rand].image.thumbnail;

  correctAnswer = pokedex[rand].name.english;

  let pokemonNames = [
    pokedex[rand].name.english,
    pokedex[rand2].name.english,
    pokedex[rand3].name.english,
  ];

  pokemonImage.classList.remove("hidden");
  name1.classList.remove("hidden");
  name2.classList.remove("hidden");
  name3.classList.remove("hidden");

  console.log(pokemonNames);

  name1.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 3), 1);

  console.log(pokemonNames);

  name2.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 2), 1);
  console.log(pokemonNames);

  name3.innerHTML = pokemonNames.splice(Math.floor(Math.random() * 1), 1);
  console.log(pokemonNames);

  //if duplicate answer

  // assign pokemon index to array

  // check if new id is part of the existing array

  // if not, continue

  // if exisit, do another random
};

const gameStart = (status = null) => {
  sampleSound.currentTime = 0;
  sampleSound.play();

  // on click - start game
  // start timer

  pointsTracking = 0;
  actualTimer = 30;
  timer.innerHTML = actualTimer;

  correctAnswer = "";
  life = 5;

  clearInterval(timerInterval);
  gameOverSound.pause();

  console.log(status);
  game();
  timerInterval = setInterval(function () {
    if (actualTimer <= 0) {
      clearInterval(timerInterval);
      gameEnd();
    }
    actualTimer -= 1;

    timer.innerHTML = actualTimer;
    console.log(actualTimer);
  }, 1000);

  //hide start page and results page (in case its a restart game)
  startPage.classList.add("hidden");
  resultsPage.classList.add("hidden");

  // show game page
  gamePage.classList.remove("hidden");
  timer.classList.remove("hidden");
  pokeBall1.classList.remove("hidden");
  pokeBall2.classList.remove("hidden");
  pokeBall3.classList.remove("hidden");
  pokeBall4.classList.remove("hidden");
  pokeBall5.classList.remove("hidden");

  // change from home page to game page
  // show picture
  // start counting game points
  // remove hidden class from timer

  // when time is 0, end game
  // when pokeball runs out, end game
};

const checkAnswer = (userInput) => {
  buttonStatus("lock"); //skin add this function. purpose of his function is to disable the button onclick
  // get user input
  // check if correct
  console.log(userInput);
  console.log(correctAnswer);

  if (userInput.innerHTML === correctAnswer) {
    console.log("correct");
    pointsTracking += 5;
    actualTimer += 3;
    pokemonImage.classList.remove("pokemonImage");

    userInput.style.background = "green";
    correctSound.play();

    // show "CORRECT" popup
  } else {
    console.log("wrong");
    // pointsTracking -= 5;
    if (pointsTracking - 5 < 0) {
      // if true
      // if points is currently less than 5, this will run
      // if points is 2
      // minus 5
      // -3
      // set points to 0 because if not will be less than 0
      pointsTracking = 0;
    } else {
      // if false
      // if points is more than 5, this will run
      // if points is 30
      // minus 5
      // 25
      // minus 5 normally
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

    // show "WRONG" popup
  }

  points.innerHTML = pointsTracking;
  setTimeout(() => {
    if (life !== 0) {
      nextRound(userInput);
    }
  }, 1500);

  // if correct plus points, increase timer, show next picture

  // wrong minus time, minus pokeball, show next picture

  //
};

const nextRound = (userInput) => {
  userInput.style.background = "white";
  buttonStatus("unlock");
  game();
};

const gameEnd = () => {
  console.log("game over");
  finalScore.innerHTML = pointsTracking;
  pokemonImage.classList.add("hidden");
  name1.classList.add("hidden");
  name2.classList.add("hidden");
  name3.classList.add("hidden");
  timer.classList.add("hidden");
  actualTimer = 0;
  // stop timer, points, etc
  // show end game screen
  // show results
  // hide game page
  gamePage.classList.add("hidden");

  //show results page
  resultsPage.classList.remove("hidden");
  sampleSound.pause();
  gameOverSound.play();
};

// add audio
// add difficulty

// bindings
