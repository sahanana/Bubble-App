const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const arrowSpeed = 5;
const circleRadius = 75;
const circleX = 150;
let arrowX = 600;
let arrowY = 200;
let arrowMoving = false;
let hitOccurred = false;
const originalCircleColor = 'darkblue'; // Initial color
let circleColor = originalCircleColor;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circleX, 200, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = circleColor;
  ctx.fill();
  ctx.closePath();
}

function drawArrow() {
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 100, arrowY);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(arrowX - 100, arrowY);
  ctx.lineTo(arrowX - 90, arrowY - 10);
  ctx.lineTo(arrowX - 90, arrowY + 10);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawArrow();
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function updateArrowPosition() {
  if (arrowMoving) {
    if (arrowX - 100 > circleX + circleRadius) {
      arrowX -= arrowSpeed;
    } else {
      arrowMoving = false;
      if (!hitOccurred) {
        circleColor = getRandomColor();
        hitOccurred = true;
        document.getElementById('message').textContent = 'Hit!';
      }
    }
    drawScene();
    requestAnimationFrame(updateArrowPosition);
  }
}

document.getElementById('hitButton').addEventListener('click', () => {
  if (!arrowMoving && !hitOccurred) {
    arrowMoving = true;
    updateArrowPosition();
  }
});

document.getElementById('resetButton').addEventListener('click', () => {
  arrowX = 600;
  arrowMoving = false;
  hitOccurred = false;
  circleColor = originalCircleColor;
  document.getElementById('message').textContent = '';
  drawScene();
});

drawScene();
