const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
const sourceImage = document.getElementById("source");
const image = new Image(112, 80);
image.src = sourceImage.src;

const canvasSize = 640;
const pixels = 16;

function drawGrid(ctx) {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.beginPath();

  const w = canvasSize / pixels;
  const h = canvasSize / pixels;
  for (let j = 0; j < pixels; j++) {
    for (let i = 0; i < pixels; i++) {
      ctx.rect(i * w, j * h, w, h);
    }
  }

  ctx.stroke();
}

function clear(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.rect(0, 0, canvasSize, canvasSize);
  ctx.stroke();
}

function drawTile(ctx, idx, posx, posy) {
  const y = Math.floor(idx / 14);
  const x = idx % 14;
  ctx.drawImage(image, x * 8, y * 8, 8, 8, posx, posy, 320, 320);
}

function rollAll() {
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 14; i++) {
      window.setTimeout(() => {
        clear(ctx);
      }, 30 * (j * 14 + i));

      window.setTimeout(() => {
        clear(ctx);
        drawTile(ctx, j * 14 + i, 4 * 40, 4 * 40);
        drawGrid(ctx);
      }, 50 * (j * 14 + i));
    }
  }
}

image.addEventListener("load", (e) => {
  drawTile(ctx, 4, 160, 160);
  drawGrid(ctx);
});
