export default function useRandomColor(): string {
  const randomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0")
    ); // 生成随机颜色
  };
  return randomColor();
}
