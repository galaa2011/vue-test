declare global {
  interface Window {
    [key: string]: any;
    "@vue/composition-api": any;
  }
}
export {};
