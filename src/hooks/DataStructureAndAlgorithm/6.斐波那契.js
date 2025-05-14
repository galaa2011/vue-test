// 递归
function fib1(n) {
  if (n <= 1) return n;

  return fib1(n - 1) + fib1(n - 2);
}

// 动态规划
function fib2(n) {
  // 1. 创建 dp 数组，保存子问题结果
  const dp = [];
  // 2. 初始化状态：为最简单的子问题设置初始值。
  dp[0] = 0;
  dp[1] = 1;

  // 3. 状态转移：dp[i] = dp[i - 1] + dp[i - 2]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  // 4. 返回结果
  return dp[n];
}
