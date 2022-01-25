
Road[] roads = new Road[4];
PImage car;
float carX;
float carMove = 0;

boolean starting = true;
int roadCount = 0;

float purpleH = 0;


//float xoff = 0;

float roadX;
float targetX;
boolean turning = false;

void setup() {
  size(640, 512);
  carX = 0.5 * width;
  roadX = 0.5 * width;
  targetX = roadX;
  car = loadImage("car3.png");
  float x = width * 0.5;
  for (int i = 0; i < 4; i++) {
    roads[i] = new Road(x, 4 + 0.25*height, 4);
  }
  roads[1].move(15);
  roads[2].move(30);
  roads[3].move(50);
}


void keyPressed() {
  if (keyCode == RIGHT) {
    carMove = 4;
  } else if (keyCode == LEFT) {
    carMove =-4;
  }
}

void keyReleased() {
  carMove = 0;
}


void draw() {




  background(0);

  if (starting) {
    if (purpleH >= height*0.25) {
      purpleH = height*0.25;
      if (frameCount % 5 == 0) roadCount++;
      if (roadCount > roads.length-1) {
        starting = false;
      }
    } else {
      purpleH+=2;
    }
  }

  fill(255, 0, 255);
  noStroke();
  rect(0, 0, width, purpleH);

  for (int i = 0; i < roadCount; i++) {
    Road r = roads[i];
    r.show();
  }


  if (starting) return;
  
  for (Road r : roads) {
    r.update(); 
  }

  carX += carMove;
  imageMode(CENTER);
  image(car, carX, height*0.75);

  float r = random(1);
  if (!turning && r < 0.0025) {
    targetX = 0.1*width;
    turning = true;
  } else if (!turning && r < 0.005) {
    targetX = 0.9*width;
    turning = true;
  }
  roadX = lerp(roadX, targetX, 0.02);
  float diff = abs(roadX-targetX);
  if (diff < 5 && targetX != 0.5*width) {
    targetX = 0.5 * width;
  } else if (diff < 1) {
    turning = false;
  }
}
