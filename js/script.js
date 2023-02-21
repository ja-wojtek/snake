console.log(`It's nice to say hello.`)


const blockSize = 25;
const rows = 25;
const cols = 25;
let board;
let context;


//Playground
window.onload = function () {
  board = document.querySelector(".board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  update();
}

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
}