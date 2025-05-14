/* 
问题描述
小R正在组织一个比赛，比赛中有 n 支队伍参赛。比赛遵循以下独特的赛制：

如果当前队伍数为 偶数，那么每支队伍都会与另一支队伍配对。总共进行 n / 2 场比赛，且产生 n / 2 支队伍进入下一轮。
如果当前队伍数为 奇数，那么将会随机轮空并晋级一支队伍，其余的队伍配对。总共进行 (n - 1) / 2 场比赛，且产生 (n - 1) / 2 + 1 支队伍进入下一轮。
小R想知道在比赛中进行的配对次数，直到决出唯一的获胜队伍为止。
 */
function solution(n) {
  // PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
  // write code here
  let sum = 0;
  // 方法一
  // const loop = (n) => {
  //   if (n === 1) return;

  //   if (n % 2 === 0) {
  //     sum += n / 2;
  //     loop(n / 2);
  //   } else {
  //     sum += (n - 1) / 2;
  //     loop((n - 1) / 2 + 1);
  //   }
  // };

  // loop(n);
  // 方法二
  while (n > 1) {
    if (n % 2 === 0) {
      sum += n / 2;
      n = n / 2;
    } else {
      sum += (n - 1) / 2;
      n = (n - 1) / 2 + 1;
    }
  }
  return sum;
}

function main() {
  console.log(solution(7) === 6);
  console.log(solution(14) === 13);
  console.log(solution(1) === 0);
}

main();
