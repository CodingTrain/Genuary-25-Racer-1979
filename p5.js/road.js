class Road {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.vy = 1;
  }

  move(count) {
    for (let i = 0; i < count; i++) {
      this.update();
    }
  }

  update() {
    this.y += this.vy;
    this.w += this.vy;
    this.vy *= 1.05;

    if (this.y > height) {
      this.y = height * 0.25 + 4;
      this.vy = 1;
      this.w = 4;
      this.x = roadX;
      //x = width * noise(xoff);
      //xoff += 0.1;
    }
  }

  show() {
    strokeWeight(4);
    stroke(255);
    const hw = 0.5 * this.w;
    line(0, this.y, this.x - hw, this.y);
    line(this.x + hw, this.y, width, this.y);
  }
}
