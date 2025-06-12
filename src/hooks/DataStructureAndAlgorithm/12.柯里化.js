const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  return next(action);
};

function curry(fn) {
  return function curried(...args1) {
    if (args1.length >= fn.length) {
      return fn(...args1);
    }

    return (...args2) => curried(...args1, ...args2);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curryAdd = curry(add);

curryAdd(1)(2, 3);
