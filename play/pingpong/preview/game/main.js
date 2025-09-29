
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let paddleHeight = 80, paddleWidth = 10;
let leftPaddle = { x: 20, y: canvas.height / 2 - 40, dy: 0 };
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - 40, dy: 0 };

let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, dx: 4, dy: 4 };

let score = [0, 0];
let gameMode = "bot"; // default
let keys = {};
let mobileControl = { left: 0, right: 0 }; // kontrol mobile

function startGame(mode) {
  gameMode = mode;
  score = [0, 0];
  resetBall();
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = (Math.random() > 0.5 ? 4 : -4);
  ball.dy = (Math.random() > 0.5 ? 4 : -4);
}

function drawCourt() {
  // lapangan biru dengan garis putih
  ctx.fillStyle = "#0044aa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // net (garis putih tengah)
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.setLineDash([10, 15]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPaddle(paddle) {
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function movePaddles() {
  // kiri: keyboard atau mobile
  if (keys["w"]) leftPaddle.dy = -6;
  else if (keys["s"]) leftPaddle.dy = 6;
  else leftPaddle.dy = mobileControl.left;

  if (gameMode === "player") {
    // kanan: keyboard atau mobile
    if (keys["ArrowUp"]) rightPaddle.dy = -6;
    else if (keys["ArrowDown"]) rightPaddle.dy = 6;
    else rightPaddle.dy = mobileControl.right;
  } else {
   // bot AI lebih gampang
   let target = ball.y - paddleHeight / 2;
 
   // kasih error margin biar kadang ga tepat
   let error = (Math.random() - 0.5) * 30; 
   target += error;
 
   // kecepatan bot dibatasi (lebih lambat dari bola)
   let speed = 3.6; // coba kecilin biar lebih mudah
 
   if (rightPaddle.y < target) {
     rightPaddle.dy = speed;
   } else if (rightPaddle.y > target) {
     rightPaddle.dy = -speed;
   } else {
     rightPaddle.dy = 0;
   }
 }
 
  // update posisi
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // batas
  leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y));
  rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y));
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // pantul atas bawah
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
  }

  // tabrak paddle kiri
  if (ball.x - ball.radius <= leftPaddle.x + paddleWidth &&
      ball.y >= leftPaddle.y && ball.y <= leftPaddle.y + paddleHeight) {
    ball.dx = Math.abs(ball.dx); // pastikan ke kanan
  }

  // tabrak paddle kanan
  if (ball.x + ball.radius >= rightPaddle.x &&
      ball.y >= rightPaddle.y && ball.y <= rightPaddle.y + paddleHeight) {
    ball.dx = -Math.abs(ball.dx); // pastikan ke kiri
  }

  // skor kiri / kanan
  if (ball.x < 0) {
    score[1]++;
    resetBall();
  }
  if (ball.x > canvas.width) {
    score[0]++;
    resetBall();
  }
}

function draw() {
  drawCourt();
  drawPaddle(leftPaddle);
  drawPaddle(rightPaddle);
  drawBall();
  scoreDisplay.textContent = `${score[0]} : ${score[1]}`;
}

function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop);
}

// Kontrol keyboard
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Kontrol mobile (touch)
document.querySelectorAll(".mobile-btn").forEach(btn => {
  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    const side = e.target.dataset.side;
    const dir = e.target.dataset.dir;

    let speed = dir === "up" ? -6 : 6;

    if (side === "left") mobileControl.left = speed;
    if (side === "right") mobileControl.right = speed;
  });

  btn.addEventListener("touchend", e => {
    e.preventDefault();
    const side = e.target.dataset.side;
    if (side === "left") mobileControl.left = 0;
    if (side === "right") mobileControl.right = 0;
  });
});

startGame("bot");
gameLoop();