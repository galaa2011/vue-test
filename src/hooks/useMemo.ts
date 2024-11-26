type MemoizedFunction<T> = (...args: any[]) => T;

const useMemo = <T>(fn: MemoizedFunction<T>) =>
  (
    (caches = new Map()) =>
    (...args: any[]) =>
      caches.has(args) ? caches.get(args) : caches.set(args, fn(...args))
  )();

export default useMemo;
