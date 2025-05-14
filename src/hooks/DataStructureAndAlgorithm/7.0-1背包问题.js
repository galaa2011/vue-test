// 给定一组物品，每个物品有重量 w[i] 和价值 v[i]，总容量为 W，每个物品只能选一次。求能装下的最大价值。
/**
 * 解决0-1背包问题
 * @param {number[]} weights 物品的重量数组
 * @param {number[]} values 物品的价值数组
 * @param {number} capacity 背包的最大容量
 * @returns {number} 背包能装入物品的最大总价值
 */
function knapsack01(weights, values, capacity) {
  const n = weights.length; // 物品的数量

  // 创建一个 (n+1) x (capacity+1) 的二维数组来存储DP状态
  // dp[i][j] 表示考虑前 i 件物品，容量为 j 时的最大价值
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // 填充DP表格 (自底向上)
  // i 从 1 到 n，表示考虑第 i 件物品 (对应 weights[i-1], values[i-1])
  for (let i = 1; i <= n; i++) {
    // j 从 0 到 capacity，表示当前的背包容量
    for (let j = 0; j <= capacity; j++) {
      // 获取当前物品的重量和价值 (注意索引偏移)
      const currentWeight = weights[i - 1];
      const currentValue = values[i - 1];

      // 情况 1: 当前物品太重，无法放入容量为 j 的背包
      // 此时最大价值等于不考虑当前物品 (即考虑前 i-1 件物品) 时的最大价值
      if (currentWeight > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 情况 2: 当前物品可以放入背包
        // 我们有两个选择:
        // a) 不放入当前物品: 价值为 dp[i-1][j]
        // b) 放入当前物品: 价值为 dp[i-1][j - currentWeight] (放入当前物品后剩余容量的最大价值) + currentValue (当前物品的价值)

        // 取这两种选择中价值更大的那个
        dp[i][j] = Math.max(
          dp[i - 1][j], // 不放入
          dp[i - 1][j - currentWeight] + currentValue // 放入
        );
      }
    }
  }

  // 最终结果存储在 dp[n][capacity]
  console.log(dp);
  return dp[n][capacity];
}

// 示例用法：
const weights = [2, 3, 4, 5]; // 物品重量
const values = [3, 4, 5, 6]; // 物品价值
const capacity = 5; // 背包容量

const maxVal = knapsack01(weights, values, capacity);
console.log("最大总价值:", maxVal); // 输出: 最大总价值: 7 (选择重量为2和3的物品，总重5，总价值 3+4=7)

const weights2 = [10, 20, 30];
const values2 = [60, 100, 120];
const capacity2 = 50;
const maxVal2 = knapsack01(weights2, values2, capacity2);
console.log("最大总价值:", maxVal2); // 输出: 最大总价值: 220 (选择重量为20和30的物品，总重50，总价值 100+120=220)
