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

const startButton = document.getElementById("startButton");
const sample = document.getElementById("sample"); // <img ... />
const sample2 = document.getElementById("sample2");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const restartButton = document.getElementById("restartButton");

const points = document.getElementById("score");
const timer = document.getElementById("timer");

let pointsTracking;
let actualTimer;
let correctAnswer;

startButton.addEventListener("click", () => {
  gameStart();
});

restartButton.addEventListener("click", () => {
  gameStart();
});

name1.addEventListener("click", () => {
  checkAnswer(name1.innerHTML);
});

name2.addEventListener("click", () => {
  checkAnswer(name2.innerHTML);
});

name3.addEventListener("click", () => {
  checkAnswer(name3.innerHTML);
});

const game = () => {
  document.querySelector("body").style.background = "";

  sample.classList.add("test");

  let rand = Math.floor(Math.random() * 800);
  let rand2 = Math.floor(Math.random() * 800);
  let rand3 = Math.floor(Math.random() * 800);
  sample.src = pokedex[rand].image.thumbnail;

  correctAnswer = pokedex[rand].name.english;

  let pokemonNames = [
    pokedex[rand].name.english,
    pokedex[rand2].name.english,
    pokedex[rand3].name.english,
  ];

  sample.classList.remove("hidden");
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

const gameStart = () => {
  pointsTracking = 0;
  actualTimer = 5;
  correctAnswer = "";

  game();

  // on click - start game
  // start timer

  let timerInterval = setInterval(function () {
    actualTimer -= 1;
    timer.innerHTML = actualTimer;
    if (actualTimer <= 0) {
      clearInterval(timerInterval);
      gameEnd();
    }
  }, 1000);

  // change from home page to game page
  // show picture
  // start counting game points
  // when time is 0, end game
  // when pokeball runs out, end game
};

const checkAnswer = (userInput) => {
  // get user input
  // check if correct
  console.log(userInput);
  console.log(correctAnswer);

  if (userInput === correctAnswer) {
    console.log("correct");
    pointsTracking += 5;
    actualTimer += 3;
    sample.classList.remove("test");

    document.querySelector("body").style.background = "green";

    // show "CORRECT" popup
  } else {
    console.log("wrong");
    pointsTracking -= 5;
    sample.classList.remove("test");
    document.querySelector("body").style.background = "red";

    // show "WRONG" popup
  }

  points.innerHTML = pointsTracking;
  setTimeout(() => {
    nextRound();
  }, 1500);

  // if correct plus points, increase timer, show next picture

  // wrong minus time, minus pokeball, show next picture

  //
};

const nextRound = () => {
  game();
};

const gameEnd = () => {
  console.log("game over");
  sample.classList.add("hidden");
  name1.classList.add("hidden");
  name2.classList.add("hidden");
  name3.classList.add("hidden");

  // stop timer, points, etc
  // show end game screen
  // show results
  //
};

// add audio
// add difficulty

// bindings
