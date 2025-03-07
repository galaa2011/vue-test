interface ExposureOptions {
  threshold?: number;
  duration?: number;
  callback?: (data: unknown) => void;
}

interface ObservedElement {
  isVisible: boolean;
  timer: NodeJS.Timeout | null;
  data: unknown;
}

class ExposureTracker {
  private threshold: number;
  private duration: number;
  private callback?: (data: unknown) => void;
  private observer: IntersectionObserver;
  private observedElements: Map<Element, ObservedElement>;

  constructor({
    threshold = 0.5,
    duration = 1000,
    callback,
  }: ExposureOptions = {}) {
    this.threshold = threshold;
    this.duration = duration;
    this.callback = callback;
    this.observedElements = new Map();

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: Array.from({ length: 10 }, (_, i) => (i + 1) / 10), // 0.1 ~ 1
    });
  }

  observe(element: Element, data: unknown = {}): void {
    if (!element) return;
    this.observedElements.set(element, { isVisible: false, timer: null, data });
    this.observer.observe(element);
  }

  unobserve(element: Element): void {
    if (this.observedElements.has(element)) {
      const record = this.observedElements.get(element);
      if (record && record.timer) {
        clearTimeout(record.timer);
      }
      this.observer.unobserve(element);
      this.observedElements.delete(element);
    }
  }

  private handleIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const { target, intersectionRatio } = entry;
      const record = this.observedElements.get(target);
      if (!record) return;

      const isVisible = intersectionRatio >= this.threshold;
      if (isVisible && !record.isVisible) {
        // 开始计时
        record.timer = setTimeout(() => {
          this.callback && this.callback(record.data);
          this.unobserve(target);
        }, this.duration);
      } else if (!isVisible && record.isVisible) {
        // 取消计时
        if (record.timer) {
          clearTimeout(record.timer);
        }
      }

      record.isVisible = isVisible;
    });
  }
}

export default function useTracker(
  options: ExposureOptions = {}
): (element: Element, data?: unknown) => void {
  const tracker = new ExposureTracker(options);
  return (element: Element, data?: unknown) => {
    tracker.observe(element, data);
  };
}
