// 模版方法模式

// 抽象类
abstract class AbstractClass {
  // 模板方法
  public templateMethod(): void {
    this.primitiveOperation1();
    if (this.condition()) {
      this.primitiveOperation2();
    }
  }
  // 基本方法
  protected abstract primitiveOperation1(): void;
  protected abstract primitiveOperation2(): void;

  // 钩子方法
  protected condition(): boolean {
    return true;
  }
}

// 具体类
class ConcreteClass extends AbstractClass {
  protected primitiveOperation1(): void {
    console.log("ConcreteClass: primitiveOperation1");
  }
  protected primitiveOperation2(): void {
    console.log("ConcreteClass: primitiveOperation2");
  }
}

// 具体类
class ConcreteClass2 extends AbstractClass {
  protected primitiveOperation1(): void {
    console.log("ConcreteClass2: primitiveOperation1");
  }
  protected primitiveOperation2(): void {
    console.log("ConcreteClass2: primitiveOperation2");
  }
  protected condition(): boolean {
    return false;
  }
}

// 客户端代码
const concreteClass = new ConcreteClass();
concreteClass.templateMethod();
const concreteClass2 = new ConcreteClass2();
concreteClass2.templateMethod();
// Output:
// ConcreteClass: primitiveOperation1
// ConcreteClass: primitiveOperation2
// ConcreteClass2: primitiveOperation1
