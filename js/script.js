////////////////////////////////
//////     SNAKE GAME     ////// 
////////////////////////////////

const blockSize = 25;
const rows = 25;
const cols = 25;
let board;
let context;
let isPressed = false;
let isGameOn = false;
let gameOver = false;
let score = document.getElementById("score");
let scorePoints = 0;
let time = document.getElementById("time");
let gameTime = 0;
let isPaused = false;

////Snake
//Head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
//Body
let snakeBody = [];
//Velocity
let velocityX = 0;
let velocityY = 0;

//Food
let foodX;
let foodY;

let game = setInterval(update, 100);

window.onload = function () {
  board = document.querySelector(".board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  if (isPressed == false) {
    document.addEventListener("keydown", changeDirection);
  }
  document.addEventListener("keydown", gamePause);
}

function update() {
  if (gameOver) {
    context.font = "50px sans-serif";
    context.fillStyle = "red";
    context.fillText("Game over", (cols * blockSize) / 2 - 125, 10 * blockSize, 250);
    context.fillText(`Score: ${scorePoints}`, (cols * blockSize) / 2 - 125, 12 * blockSize, 250);
    context.fillText(`Time: ${gameTime / 10}s`, (cols * blockSize) / 2 - 125, 14 * blockSize);
    return;
  }



  //Start timer
  if (velocityX != 0 || velocityY != 0) {
    gameTime++;
  }
  time.innerHTML = `Time: ${Math.floor(gameTime / 10)}s`;

  //Drawing board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //Drawing food
  context.fillStyle = "tomato";
  context.fillRect(foodX, foodY, blockSize, blockSize)

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    scorePoints++;
    score.innerHTML = `Score: ${scorePoints}`;
  }

  //Snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime"
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize)

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
  isPressed = false;
  snakeSegments(); // Creating snake's segments

}

//Placing food function
function placeFood() {
  let isFood;
  let tempFoodX;
  let tempFoodY;
  //checking not to place food inside snake's body
  do {
    isFood = true;
    tempFoodX = Math.floor(Math.random() * cols) * blockSize;
    tempFoodY = Math.floor(Math.random() * rows) * blockSize;

    for (let i = 0; i < snakeBody.length; i++) {
      if (tempFoodX == snakeBody[i][0] && tempFoodY == snakeBody[i][1]) {
        isFood = false;
      }
    }
  } while (isFood = false)
  foodX = tempFoodX;
  foodY = tempFoodY;

}

//Keyboard control
function changeDirection(e) {
  if (isPressed == false) {
    if (e.code == "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
      isPressed = true;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
      isPressed = true;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
      isPressed = true;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
      isPressed = true;
    }
  }
}

function gamePause(e) {
  if (e.code == "Space" && isPaused == false) {
    isPaused = true;
    clearInterval(game);
  }
  else if (e.code == "Space" && isPaused == true) {
    isPaused = false;
    game = setInterval(update, 100);
  }
}

function snakeSegments() {
  //Creating snake's segments. Drawing net after drawing snake and food.
  for (let i = 0; i <= cols; i++) {
    context.fillStyle = "black";
    context.fillRect(i * blockSize, 0, 1, rows * blockSize)
  }
  for (let i = 0; i <= rows; i++) {
    context.fillStyle = "black";
    context.fillRect(0, i * blockSize, cols * blockSize, 1)
  }
}
