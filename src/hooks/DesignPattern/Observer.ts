// 观察者模式
interface Observer {
  update(data: any): void;
}

// 主题
class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// 具体观察者
class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(data: any): void {
    console.log(`${this.name} received data:`, data);
  }
}

// 使用示例
const subject = new Subject();
const observer1 = new ConcreteObserver("Observer 1");
const observer2 = new ConcreteObserver("Observer 2");
subject.attach(observer1);
subject.attach(observer2);
subject.notify({ message: "Hello Observers!" });
subject.detach(observer1);
subject.notify({ message: "Observer 1 has been detached." });
// Output:
// Observer 1 received data: { message: 'Hello Observers!' }
// Observer 2 received data: { message: 'Hello Observers!' }
// Observer 2 received data: { message: 'Observer 1 has been detached.' }
export { Observer, Subject, ConcreteObserver };
export default Subject;
