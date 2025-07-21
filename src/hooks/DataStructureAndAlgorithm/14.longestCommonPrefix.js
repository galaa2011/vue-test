// const strs = ["flower", "flow", "flight"];
export function longestCommonPrefix(strs) {
  if (!strs || strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

function solution(strs) {
  const result = [];
  for (let i = 0; i < strs[0].length; i++) {
    const curr = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (curr !== strs[j][i]) break;
      if (curr === strs[j][i] && j === strs.length - 1) {
        result.push(curr);
      }
    }
  }

  return result;
}
