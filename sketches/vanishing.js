const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x**2 + this.y**2);
  }
};

const normalize = (v) => {
  return new Vector(v.x / v.magnitude(), v.y / v.magnitude());
}

const distanceBetweenPoints = (p1, p2, d) => {
  // move disance d along the direction from p1 to p2
  const v = normalize(new Vector(p2.x - p1.x, p2.y - p1.y));

  return new Vector(p1.x + v.x * d, p1.y + v.y * d);
}

const drawSquareRight = (context, start, vpUp, vpRight, width, height) => {
  context.save();

  const topLeft = distanceBetweenPoints(start, vpUp, height);

  const bottomRight = distanceBetweenPoints(start, vpRight, width);

  const topRight = intersection of topLeft to vpRight and bottomRight to vpUp

  context.moveTo(start.x, start.y);
  context.lineTo(bottomRight.x, bottomRight.y);
  context.lineTo(topRight.x, topRight.y);
  context.lineTo(topLeft.x, topLeft.y);
  context.closePath();
  context.stroke();

  // back to to left

  context.restore();
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    const vpUp = new Vector(540, 20);
    const vpRight = new Vector(1000, 540);

    drawSquareRight(context, new Vector(300, 600), vpUp, vpRight, 100, 150);

    context.arc()
  };
};

canvasSketch(sketch, settings);
