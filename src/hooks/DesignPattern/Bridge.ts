// 桥接模式
interface DrawAPI {
  drawCircle(radius: number, x: number, y: number): void;
}

class RedCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(`Drawing Red Circle with radius ${radius}, x: ${x}, y: ${y}`);
  }
}

class GreenCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(`Drawing Green Circle with radius ${radius}, x: ${x}, y: ${y}`);
  }
}

abstract class Shape {
  protected drawAPI: DrawAPI;

  protected constructor(drawAPI: DrawAPI) {
    this.drawAPI = drawAPI;
  }

  abstract draw(): void;
}

class Circle extends Shape {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number, drawAPI: DrawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(): void {
    this.drawAPI.drawCircle(this.radius, this.x, this.y);
  }
}

// 使用桥接模式
const redCircle = new Circle(100, 100, 10, new RedCircle());
const greenCircle = new Circle(100, 100, 10, new GreenCircle());
redCircle.draw();
greenCircle.draw();
