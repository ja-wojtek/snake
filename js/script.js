console.log(`It's nice to say hello.`)


const blockSize = 25;
const rows = 25;
const cols = 25;
let board;
let context;

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

let gameOver = false;

//Playground
window.onload = function () {
  board = document.querySelector(".board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keydown", changeDirection);
  setInterval(update, 1000 / 10);
}

function update() {
  if (gameOver) {
    alert("Game over");
    return;
  }

  //Board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //Food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize)

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
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
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }


  if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
}


//Placing food function
function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}