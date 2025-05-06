// 访问者模式

// 抽象访问者
interface Visitor {
  visit(element: AElement): void;
}

// 具体访问者
class ConcreteVisitorA implements Visitor {
  visit(element: AElement): void {
    console.log("ConcreteVisitorA visit ->", element.operation());
  }
}

// 具体访问者
class ConcreteVisitorB implements Visitor {
  visit(element: AElement): void {
    console.log("ConcreteVisitorB visit ->", element.operation());
  }
}

// 抽象元素
interface AElement {
  accept(visitor: Visitor): void;
  operation(): string;
}

// 具体元素
class ConcreteElementA implements AElement {
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
  operation(): string {
    return "ConcreteElementA";
  }
}

// 具体元素
class ConcreteElementB implements AElement {
  accept(visitor: Visitor): void {
    visitor.visit(this);
  }
  operation(): string {
    return "ConcreteElementB";
  }
}

// 客户端代码
const elements: AElement[] = [new ConcreteElementA(), new ConcreteElementB()];
const visitorA = new ConcreteVisitorA();
const visitorB = new ConcreteVisitorB();

elements.forEach((element) => {
  element.accept(visitorA);
  element.accept(visitorB);
});

// Output:
// ConcreteVisitorA visit -> ConcreteElementA
// ConcreteVisitorB visit -> ConcreteElementA
// ConcreteVisitorA visit -> ConcreteElementB
// ConcreteVisitorB visit -> ConcreteElementB
