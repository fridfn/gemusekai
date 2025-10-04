let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let ballRadius = 10;
let x, y, dx, dy;

let paddleHeight = 12;
let paddleWidth = 72;
let paddleX;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;

let score;
let bricks = [];
let gameRunning = false;

function initGame() {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  score = 0;

  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function mouseMoveHandler(e) {
  const rect = canvas.getBoundingClientRect();
  const relativeX = e.clientX - rect.left;
  
  // Hitung posisi paddle berdasarkan mouse
  let newPaddleX = relativeX - paddleWidth / 2;
  
  // Batasi paddle agar tidak keluar canvas
  paddleX = Math.max(0, Math.min(newPaddleX, canvas.width - paddleWidth));
  
  console.log('Mouse - relativeX:', relativeX, 'paddleX:', paddleX, 'canvas.width:', canvas.width);
}

// LOGIKA MOBILE - Touch Events
function touchMoveHandler(e) {
  e.preventDefault(); // Cegah scroll
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const relativeX = touch.clientX - rect.left;
  
  // Hitung posisi paddle berdasarkan touch
  let newPaddleX = relativeX - paddleWidth / 2;
  
  // Batasi paddle agar tidak keluar canvas
  paddleX = Math.max(0, Math.min(newPaddleX, canvas.width - paddleWidth));
  
  console.log('Touch - relativeX:', relativeX, 'paddleX:', paddleX, 'canvas.width:', canvas.width);
}

function keyDownHandler(e) {
  if (e.keyCode === 39) rightPressed = true;
  else if (e.keyCode === 37) leftPressed = true;
}

function keyUpHandler(e) {
  if (e.keyCode === 39) rightPressed = false;
  else if (e.keyCode === 37) leftPressed = false;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'lawngreen';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'lawngreen';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = '18px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 8, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            endGame("YOU WIN!");
          }
        }
      }
    }
  }
}

function endGame(message) {
  gameRunning = false;
  canvas.removeEventListener("mousemove", mouseMoveHandler);
  canvas.removeEventListener("touchmove", touchMoveHandler);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width/2, canvas.height/2 - 20);
  ctx.fillText("Tap / Click to Restart", canvas.width/2, canvas.height/2 + 20);

  canvas.addEventListener("click", handleRestart, { once: true });
  canvas.addEventListener("touchstart", handleRestart, { once: true });
}

function handleRestart() {
  canvas.addEventListener("mousemove", mouseMoveHandler);
  canvas.addEventListener("touchmove", touchMoveHandler, { passive: false });
  initGame();
  gameRunning = true;
}

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Tap to Start", canvas.width/2, canvas.height/2 + 20);

  canvas.addEventListener("click", startGame, { once: true });
  canvas.addEventListener("touchstart", startGame, { once: true });
}

function startGame() {
  canvas.addEventListener("mousemove", mouseMoveHandler);
  canvas.addEventListener("touchmove", touchMoveHandler, { passive: false });
  initGame();
  gameRunning = true;
}

function draw() {
  if (!gameRunning) {
    return;
  }

  // Update paddle dengan keyboard
  if (rightPressed) {
    paddleX += 7;
  } else if (leftPressed) {
    paddleX -= 7;
  }
  
  // Batasi paddle
  paddleX = Math.max(0, Math.min(paddleX, canvas.width - paddleWidth));

  // Cek collision dengan brick
  collisionDetection();

  // Collision dengan dinding kiri/kanan
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  
  // Collision dengan dinding atas
  if (y + dy < ballRadius) {
    dy = -dy;
  } 
  // Collision dengan paddle atau game over
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      endGame("GAME OVER");
      return;
    }
  }

  // Update posisi bola
  x += dx;
  y += dy;

  // Render
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawBricks();
  drawBall();
  drawPaddle();
}

// Tampilkan start screen
drawStartScreen();

setInterval(draw, 10);