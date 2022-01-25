class Road {
  float x, y, w;
  float vy;

  Road(float x_, float y_, float w_) {
    x = x_;
    y = y_;
    w = w_;
    vy = 1;
  }

  void move(int count) {
    for (int i = 0; i < count; i++) {
      update();
    }
  }

  void update() {
    y  += vy;
    w  += vy;
    vy *= 1.05;


    if (y > height) {
      y = height *0.25 + 4;
      vy = 1;
      w = 4;
      
      x = roadX;
      //x = width * noise(xoff);
      //xoff += 0.1;
    }
  }

  void show() {
    strokeWeight(4);
    stroke(255);
    float hw = 0.5*w;
    line(0, y, x-hw, y);
    line(x+hw, y, width, y);
  }
}
