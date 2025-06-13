// 策略模式

// 定义策略接口
interface Strategy {
  execute(a: number, b: number): number;
}

// 定义策略类
class AStrategy implements Strategy {
  execute(a: number, b: number): number {
    console.log(a, b);
    return a + b;
  }
}

class BStrategy implements Strategy {
  execute(a: number, b: number): number {
    console.log(a, b);
    return a - b;
  }
}

// 定义上下文类
class Context {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }
  execute(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
}

// 测试
const context = new Context(new AStrategy());
console.log(context.execute(1, 2));
context.setStrategy(new BStrategy());
console.log(context.execute(1, 2));
