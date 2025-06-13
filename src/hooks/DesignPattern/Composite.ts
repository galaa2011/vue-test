// 组合模式

// 抽象组件
abstract class Component {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract operation(): void;
  abstract add(component: Component): void;
  abstract remove(component: Component): void;
  abstract getChildren(): Component[];
}

// 叶子节点
class Leaf extends Component {
  constructor(name: string) {
    super(name);
  }

  operation(): void {
    console.log(`Leaf ${this.name} is performing operation`);
  }

  add(component: Component): void {
    console.log("Cannot add to a leaf");
  }

  remove(component: Component): void {
    console.log("Cannot remove from a leaf");
  }

  getChildren(): Component[] {
    return [];
  }
}

// 组合节点
class Composite extends Component {
  private children: Component[] = [];

  constructor(name: string) {
    super(name);
  }

  operation(): void {
    console.log(`Composite ${this.name} is performing operation`);
    this.children.forEach((child) => child.operation());
  }

  add(component: Component): void {
    this.children.push(component);
  }

  remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren(): Component[] {
    return this.children;
  }
}

// 使用示例
export function compositeDemo() {
  // 创建根节点
  const root = new Composite("Root");

  // 创建分支节点
  const branch1 = new Composite("Branch 1");
  const branch2 = new Composite("Branch 2");

  // 创建叶子节点
  const leaf1 = new Leaf("Leaf 1");
  const leaf2 = new Leaf("Leaf 2");
  const leaf3 = new Leaf("Leaf 3");

  // 组装树形结构
  root.add(branch1);
  root.add(branch2);

  branch1.add(leaf1);
  branch1.add(leaf2);
  branch2.add(leaf3);

  // 执行操作
  console.log("Executing root operation:");
  root.operation();

  console.log("\nExecuting branch1 operation:");
  branch1.operation();

  // 移除一个节点
  console.log("\nRemoving leaf2 from branch1");
  branch1.remove(leaf2);

  console.log("\nExecuting root operation after removal:");
  root.operation();

  return "Composite Pattern Demo Executed";
}
