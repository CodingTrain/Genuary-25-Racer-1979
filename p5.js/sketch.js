const roads = [];
let car;
let carX;
let carMove = 0;

let starting = true;
let roadCount = 0;
let purpleH = 0;

let roadX;
let targetX;
let turning = false;

function preload() {
  car = loadImage("data/car3.png");
}
function setup() {
  createCanvas(640, 512);
  carX = 0.5 * width;
  roadX = 0.5 * width;
  targetX = roadX;
  let x = width * 0.5;
  for (let i = 0; i < 4; i++) {
    roads[i] = new Road(x, 4 + 0.25 * height, 4);
  }
  roads[1].move(15);
  roads[2].move(30);
  roads[3].move(50);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    carMove = 4;
  } else if (keyCode == LEFT_ARROW) {
    carMove = -4;
  }
}

function keyReleased() {
  carMove = 0;
}

function draw() {
  background(0);

  // if (keyIsDown(RIGHT_ARROW)) {
  //   carMove = 4;
  // } else if (keyIsDown(LEFT_ARROW)) {
  //   carMove = -4;
  // } else {
  //   carMove = 0;
  // }

  if (starting) {
    if (purpleH >= height * 0.25) {
      purpleH = height * 0.25;
      if (frameCount % 5 == 0) roadCount++;
      if (roadCount > roads.length - 1) {
        starting = false;
      }
    } else {
      purpleH += 2;
    }
  }

  fill(255, 0, 255);
  noStroke();
  rect(0, 0, width, purpleH);

  for (let i = 0; i < roadCount; i++) {
    const r = roads[i];
    r.show();
  }

  if (starting) return;

  for (let r of roads) {
    r.update();
  }

  carX += carMove;
  imageMode(CENTER);
  image(car, carX, height * 0.75);

  const r = random(1);
  if (!turning && r < 0.0025) {
    targetX = 0.1 * width;
    turning = true;
  } else if (!turning && r < 0.005) {
    targetX = 0.9 * width;
    turning = true;
  }
  roadX = lerp(roadX, targetX, 0.02);
  const diff = abs(roadX - targetX);
  if (diff < 5 && targetX != 0.5 * width) {
    targetX = 0.5 * width;
  } else if (diff < 1) {
    turning = false;
  }
}
