/* 
问题描述
小R从班级中抽取了一些同学，每位同学都会给出一个数字。已知在这些数字中，某个数字的出现次数超过了数字总数的一半。现在需要你帮助小R找到这个数字。
 */
function solution(array) {
  // Edit your code here
  // 方法一：哈希表统计法
  // const result = { maxCount: 0 };
  // array.forEach((item) => {
  //   if (result[item] !== undefined) {
  //     result[item]++;
  //     if (result[item] > result.maxCount) {
  //       result.maxCount = result[item];
  //       result.num = item;
  //     }
  //   } else {
  //     result[item] = 1;
  //   }
  // });
  // return result.num;

  // 方法二：排序法

  // 方法三：摩尔投票法：是一种在线性时间内找到出现次数超过一半的元素的方法
  let element;
  let count;
  array.forEach((el, i) => {
    if (i === 0) {
      // 初始化
      element = el;
      count = 1;
    } else {
      element === el ? count++ : count--;
      if (count === 0) {
        // 替换当前element，重置count
        element = el;
        count = 1;
      }
    }
  });

  return element;
}

function main() {
  // Add your test cases here
  console.log(solution([1, 3, 8, 2, 3, 1, 3, 3, 3]) === 3);
}

main();
