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
//Velocity
let velocityX = 0;
let velocityY = 0;

//Food
let foodX;
let foodY;

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
  //Board
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  //Snake
  context.fillStyle = "lime"
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize)

  //Food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize)
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  }
  else if (e.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  }
  else if (e.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  }
  else if (e.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
}