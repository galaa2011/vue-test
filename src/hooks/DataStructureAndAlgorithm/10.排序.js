// 冒泡
function maopao(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

console.log(maopao([4, 5, 3, 2, 6, 5, 4, 3, 1, 0, 9]));

// 快排
function kuaipai(arr) {
  if (arr.length <= 1) return arr;

  const el = arr[0];
  const left = [];
  const right = [];
  arr.slice(1).forEach((item) => {
    item <= el ? left.push(item) : right.push(item);
  });

  return [...kuaipai(left), el, ...kuaipai(right)];
}

console.log(kuaipai([4, 5, 3, 2, 6, 5, 4, 3, 1, 0, 9]));
