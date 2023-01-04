
//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context; 

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

//food
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board"); //canvas
    board.height = rows * blockSize; //20*25
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {//if snake eat food
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
// snake extends everytime
    context.fillStyle="lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
