/* 
数字分组求偶数和

问题描述
小M面对一组从 1 到 9 的数字，这些数字被分成多个小组，并从每个小组中选择一个数字组成一个新的数。目标是使得这个新数的各位数字之和为偶数。任务是计算出有多少种不同的分组和选择方法可以达到这一目标。
  numbers: 一个由多个整数字符串组成的列表，每个字符串可以视为一个数字组。小M需要从每个数字组中选择一个数字。
例如对于[123, 456, 789]，14个符合条件的数为：147 149 158 167 169 248 257 259 268 347 349 358 367 369。
 */
function solution(numbers) {
  // Please write your code here
  let count = 0;
  const sumNumbers = (index, sum) => {
    if (index === numbers.length) {
      if ((sum & 1) === 0) count++;
      return;
    }
    const numStr = numbers[index].toString();
    for (let i = 0; i < numStr.length; i++) {
      // NOTE: sum + +numStr[i]要直接传入
      // 不能 sum += +numStr[i]再传
      sumNumbers(index + 1, sum + +numStr[i]);
    }
  };

  sumNumbers(0, 0);
  return count;
}

function main() {
  // You can add more test cases here
  console.log(solution([123, 456, 789]) === 14);
  console.log(solution([123456789]) === 4);
  console.log(solution([14329, 7568]) === 10);
}

main();
