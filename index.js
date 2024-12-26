// game container

const gameCont = document.createElement("div");
document.getElementById("container").appendChild(gameCont);
gameCont.classList.add("gameCont");
gameCont.id = "gameCont"

//Start button
const start = document.createElement("button");
document.getElementById("gameCont").appendChild(start);
start.classList.add("startButton");
start.innerHTML = "Start";
start.addEventListener("click", gameStart);

//Basket
const basket = document.createElement("div");
basket.innerHTML = `<img src="basket.png" alt="Basket">`;
gameCont.appendChild(basket);
basket.classList.add("basket");

// side bar 
const sideBar = document.createElement("div")
sideBar.id = "sideBar"
sideBar.classList.add("sideBar")
document.getElementById("container").appendChild(sideBar);

//Score & Live
let score = 0;
let lives = 3;

// score container
const scoreContainer = document.createElement("div");
scoreContainer.innerHTML = "score:" + score;
scoreContainer.classList.add("scoreContainer");
scoreContainer.id = "scoreContainer";

// live cont
const livesCont = document.createElement("div");
livesCont.classList.add("liveCont");
livesCont.id = "liveCont";

// append live and score cont to side bar
document.getElementById("sideBar").appendChild(scoreContainer);
document.getElementById("sideBar").appendChild(livesCont);

// live icon container div
const liveIcon1 = document.createElement("div");
const liveIcon2 = document.createElement("div");
const liveIcon3 = document.createElement("div");

// live icon
liveIcon1.classList.add("liveIcon");
liveIcon2.classList.add("liveIcon");
liveIcon3.classList.add("liveIcon");

// live icon append to live container
document.getElementById("liveCont").appendChild(liveIcon1);
document.getElementById("liveCont").appendChild(liveIcon2);
document.getElementById("liveCont").appendChild(liveIcon3);

// difficulty selector
const difficultySelector = document.createElement("div");
difficultySelector.classList.add("difficultySelector");
document.getElementById("sideBar").appendChild(difficultySelector);

difficultySelector.innerHTML = `
<h3>Select Difficulty:</h3>
<select id="difficultyLevel">
<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>
<option value="diehard">DieHard</option>
</select>
`;

// // default falling speed
let timeInt = 2000;

// adjust speed based on difficulty
function adjustDifficulty() {
  const difficulty = document.getElementById("difficultyLevel").value;
  switch (difficulty) {
    case "easy":
      timeInt = 2000;
      break;
    case "medium":
      timeInt = 1500;
      break;
    case "hard":
      timeInt = 1000;
      break;
    case "diehard":
      timeInt = 500;
      break;
  }
}
document.getElementById("difficultyLevel").addEventListener("change", adjustDifficulty);

// background music
const backgroundMusic = document.createElement("audio")
backgroundMusic.src = "audio.mp3"
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

//Fruits
const fruitContainer = document.createElement("div");
fruitContainer.classList.add("fruitCont");
gameCont.appendChild(fruitContainer);

let apple = [],
  strawberry = [],
  cherry = [],
  banana = [],
  arr = [];

//Start
function gameStart() {

  // play background music
  backgroundMusic.play();

  // basket placement
  basket.style.top = "930px";
  // remove start button
  start.style.display = "none";

  //All fruits that will be used in game
  let apple_c = 0, cherry_c = 0, strawberry_c = 0, banana_c = 0;
  for (let i = 0; i <= 400; i++) {
    let ri = Math.floor(Math.random() * 4);
    switch (ri) {
      case 0:
        apple[apple_c] = document.createElement("div");
        fruitContainer.appendChild(apple[apple_c]);
        apple[apple_c].classList.add("fruit");
        apple[apple_c].classList.add("apple");
        apple_c++; break;

      case 1:
        strawberry[strawberry_c] = document.createElement("div");
        fruitContainer.appendChild(strawberry[strawberry_c]);
        strawberry[strawberry_c].classList.add("fruit");
        strawberry[strawberry_c].classList.add("strawberry");
        strawberry_c++; break;
      case 2:
        banana[banana_c] = document.createElement("div");
        fruitContainer.appendChild(banana[banana_c]);
        banana[banana_c].classList.add("fruit");
        banana[banana_c].classList.add("banana");
        banana_c++; break;
      case 3:
        cherry[cherry_c] = document.createElement("div");
        fruitContainer.appendChild(cherry[cherry_c]);
        cherry[cherry_c].classList.add("fruit");
        cherry[cherry_c].classList.add("cherry");
        cherry_c++; break;
    }
  }

  const fruits = document.getElementsByClassName("fruit");

  //First interval: animates fruit fall
  let i = 0,
    j = 0,
    firstInt = setInterval(firstFunction, timeInt);
  // timeInt = 1500;

  function firstFunction() {
    // if game is over stop this function
    if (isGameOver) {
      return
    }

    // munkh delger's logic
    let ran = Math.floor(Math.random() * 940);
    fruits[i].style.left = ran + "px";
    fruits[i].style.top = "-100px";
    fruits[i].classList.add("animate");
    i++;
    arr.push(ran);
    console.log("First function " + timeInt);
  }

  //Second interval: At the end of fall checks coordinates, grants score
  setTimeout(() => {
    let secondInt = setInterval(secondFunction, timeInt);
  }, 2900);

  function secondFunction() {
    // if game is over stop this function 
    if (isGameOver) {
      return
    }

    // munkh delger's logic
    console.log(arr[j]);
    score_check(arr[j]);
    j++;
    console.log("Second function " + timeInt);
  }
  // Score audio

  const scoreAudio = document.createElement("audio");
  scoreAudio.src = "score.mp3";
  scoreAudio.volume = 0.3;

  // basket animation function when score
  function shakeBasket() {
    basket.classList.add("shake");

    //  basket shake animation reset after first catch gehiimuudaa hha
    setTimeout(() => {
      basket.classList.remove("shake");
    }, 500);
  }
  // score checker 

  let lvl = 0;
  function score_check(ran) {
    console.log(position);
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 150;
    if (leftEdge <= ran && rightEdge >= ran) {
      score += 1;
      document.getElementById("scoreContainer").innerHTML = "score:" + score;

      // score sound
      scoreAudio.pause();
      scoreAudio.currentTime = 0
      scoreAudio.play();

      // basket shake animation
      shakeBasket();

    } else {
      lives = live_u(lives);
    }
  }

  // losing live sound
  const loseLifeSound = document.createElement("audio");
  loseLifeSound.src = "Losing_live.wav";
  loseLifeSound.volume = 0.5;

  // lives logic
  function live_u(lives) {
    lives -= 1;
    console.log(lives);
    if (lives == 2) {
      document.getElementById("liveCont").removeChild(liveIcon2);
    } else if (lives == 1) {
      document.getElementById("liveCont").removeChild(liveIcon3);
    } else if (lives == 0) {
      document.getElementById("liveCont").removeChild(liveIcon1);
      gameOver();
    }

    // play lose life sound 
    loseLifeSound.pause()
    loseLifeSound.currentTime = 0
    loseLifeSound.play();

    return lives;
  }

  //move Basket with Arrow
  let modifier = 80;

  let position = { left: 450 };

  const containerWidth = gameCont.offsetWidth;
  const basketWidth = basket.offsetWidth;

  function moveBasket(event) {
    if (event.key === "ArrowLeft") {
      position.left = Math.max(0, position.left - modifier);
    } else if (event.key === "ArrowRight") {
      position.left = Math.min(containerWidth - basketWidth, position.left + modifier);
    }
    basket.style.left = position.left + "px";
  }

  document.addEventListener("keydown", moveBasket);

  // move Basket with Mouse
  function moveBasketWithMouse(event) {

    const mouseX = event.clientX - gameCont.offsetLeft;
    position.left = Math.min(
      Math.max(0, mouseX - basketWidth / 2),
      containerWidth - basketWidth
    );
    basket.style.left = position.left + "px";
  }
  gameCont.addEventListener("mousemove", moveBasketWithMouse);
}

// game over sound
const gameOverSound = new Audio("game_over.mp3");
gameOverSound.volume = 1;

// game over and restart

// game over flag, key for stopping all logic when game is over 
let isGameOver = false
/////////////////////

function gameOver() {
  // togloom duussaniig tumend tugee !!
  isGameOver = true

  // remove basket 
  gameCont.removeChild(basket)
  /////
  gameOverSound.play();
  // game over text

  const gameOverMessage = document.createElement("div");
  gameOverMessage.className = "gameOverMessage";
  gameOverMessage.innerHTML = `
  <h1>Game Over</h1>
  <p>Your score: ${score}</p>
  `;
  gameCont.appendChild(gameOverMessage);

  // stop background music 
  backgroundMusic.pause()

  // restart the game
  gameOverMessage.onclick = function () {
    window.location.reload();
  }

}