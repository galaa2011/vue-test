// 装饰器模式

// 类装饰器
function logClass(target: any) {
  console.log(`Class: ${target.name}`);
}
// 方法装饰器
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method: ${propertyKey}, Args: ${JSON.stringify(args)}`);
    return originalMethod.apply(this, args);
  };
}
// 属性装饰器
// function logProperty(target: any, propertyKey: string) {
//   let value = target[propertyKey];
//   const getter = () => {
//     console.log(`Get: ${propertyKey} => ${value}`);
//     return value;
//   };
//   const setter = (newValue: any) => {
//     console.log(`Set: ${propertyKey} => ${newValue}`);
//     value = newValue;
//   };
//   Object.defineProperty(target, propertyKey, {
//     get: getter,
//     set: setter,
//     enumerable: true,
//     configurable: true,
//   });
// }
function logProperty(target: any, propertyKey: string) {
  // 使用Symbol确保属性唯一
  const privateKey = Symbol(propertyKey);

  // 在类的原型上定义属性
  Object.defineProperty(target, propertyKey, {
    get() {
      const value = this[privateKey];
      console.log(`Get: ${propertyKey} => ${value}`);
      return value;
    },
    set(value: any) {
      console.log(`Set: ${propertyKey} => ${value}`);
      this[privateKey] = value;
    },
    enumerable: true,
    configurable: true,
  });
}
// 参数装饰器
function logParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  const originalMethod = target[propertyKey];
  target[propertyKey] = function (...args: any[]) {
    console.log(
      `Parameter at index ${parameterIndex} in method ${propertyKey} => ${args[parameterIndex]}`
    );
    return originalMethod.apply(this, args);
  };
}
// 使用装饰器
@logClass
class Example {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  @logMethod
  public greet(@logParameter message: string): string {
    return `${this.name} says: ${message}`;
  }
}
// 测试装饰器
const example = new Example("Alice");
console.log(example.greet("Hello!")); // 输出: Alice says: Hello!
// 输出: Class: Example
// 输出: Get: name => Alice
// 输出: Set: name => Alice
// 输出: Method: greet, Args: ["Hello!"]
// 输出: Parameter at index 0 in method greet => Hello!
export { logClass, logMethod, logProperty, logParameter, Example };
export default Example;
