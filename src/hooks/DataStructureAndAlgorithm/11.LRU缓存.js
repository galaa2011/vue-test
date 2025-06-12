class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }

    return -1;
  }

  set(key, value) {
    if (this.cache.size >= this.size) {
      const [_key] = [...this.cache.keys()];
      this.cache.delete(_key);
    }
    this.cache.set(key, value);
  }
}
