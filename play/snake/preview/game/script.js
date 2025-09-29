const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let score = 0;
let dir = "right";
let game;
let speed = 200;
let paused = false;

function draw() {
  if (paused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#22d3ee" : "#67e8f9";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let head = { ...snake[0] };
  if (dir === "left") head.x -= box;
  if (dir === "right") head.x += box;
  if (dir === "up") head.y -= box;
  if (dir === "down") head.y += box;

  // Game over
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
    location.reload();
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
    // Increase speed
    clearInterval(game);
    speed = Math.max(50, speed - 10);
    game = setInterval(draw, speed);
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function move(direction) {
  if (direction === "left" && dir !== "right") dir = "left";
  if (direction === "right" && dir !== "left") dir = "right";
  if (direction === "up" && dir !== "down") dir = "up";
  if (direction === "down" && dir !== "up") dir = "down";
}

function pauseGame() {
  paused = !paused;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
  if (e.key === " ") pauseGame();
});

game = setInterval(draw, speed);