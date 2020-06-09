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
  //ctx.beginPath();
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  //ctx.fill();
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

//const TWEEN = require("@tweenjs/tween.js");

/**
 * load sprite 1
 * show on x,y
 * for 10 seconds - move to x2,y2, animate
 * s:0, load sprite 2
 * frame1 - show sprite at x,y
 * move to x2,y2 for 10 frames
 * frame10 - show sprite1 at x,y,
 * move to x2,y2 for 10 frames, animated
 */

const pos = { x: 0, y: 0 };

function loop(frame) {
  clear(ctx);
  drawGrid(ctx);
  drawTile(ctx, 4, Math.floor(pos.x * 40), Math.floor(pos.y * 40));
}

var tween = new TWEEN.Tween(pos);

image.addEventListener("load", (e) => {
  let frame = 1;
  const fps = 10;

  tween.to({ x: 8, y: 8 }, 2000);
  tween.start();
  tween.repeat(Infinity);
  tween.yoyo(true);
  const startTime = new Date().getTime();
  let last = startTime;
  window.setInterval(() => {
    clear(ctx);
    const now = new Date().getTime();
    try {
      tween.update(last);
    } catch (e) {
      console.warn("Tween update failed", e);
    }
    try {
      loop(frame);
    } catch (e) {
      console.warn("Loop update failed", e);
    }

    frame++;
    last = now;
  }, 1000 / fps);
});
