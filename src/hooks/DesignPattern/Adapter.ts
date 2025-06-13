// 适配器模式
class OldSystem {
  public oldMethod(): string {
    return "Old system method";
  }
}
interface NewSystem {
  newMethod(): string;
}
class Adapter implements NewSystem {
  private oldSystem: OldSystem;

  constructor(oldSystem: OldSystem) {
    this.oldSystem = oldSystem;
  }

  public newMethod(): string {
    return this.oldSystem.oldMethod();
  }
}

// 使用适配器
const oldSystem = new OldSystem();
const adapter = new Adapter(oldSystem);
console.log(adapter.newMethod()); // 输出: Old system method
