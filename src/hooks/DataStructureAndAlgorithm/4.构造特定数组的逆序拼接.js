function solution(n) {
  // PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
  // write code here
  const result = [];
  for (let i = 1; i <= n; i++) {
    for (let j = n; j >= i; j--) {
      result.push(j);
    }
  }
  return result;
}

function main() {
  console.log(
    JSON.stringify(solution(3)) === JSON.stringify([3, 2, 1, 3, 2, 3])
  );
  console.log(
    JSON.stringify(solution(4)) ===
      JSON.stringify([4, 3, 2, 1, 4, 3, 2, 4, 3, 4])
  );
  console.log(
    JSON.stringify(solution(5)) ===
      JSON.stringify([5, 4, 3, 2, 1, 5, 4, 3, 2, 5, 4, 3, 5, 4, 5])
  );
}

main();
