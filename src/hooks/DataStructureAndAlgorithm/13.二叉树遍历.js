// 二叉树遍历

// 前序遍历
function preOrder(root) {
  // 方法一：递归
  // const result = [];

  // function traverse(node) {
  //   if (!node) return;
  //   result.push(node.val);
  //   traverse(node.left);
  //   traverse(node.right);
  // }

  // traverse(root);
  // return result;

  // 方法二：使用栈
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      result.push(current.val);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }

  return result;
}
// 中序遍历
function inOrder(root) {
  // 使用栈
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}
// 后序遍历
// 层序遍历，使用队列，广度优先；记录每一层的节点
function levelOrder(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];

  while (queue.length) {
    // 存储每层数据
    const level = [];
    const size = queue.length; // 当前循环length

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);

      // 把下一层的左右子节点推到队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

const root = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
};

console.log(preOrder(root));
console.log(inOrder(root));
console.log(levelOrder(root));

// 二叉树路径求和
function sumTree(root, targetSum) {
  const result = [];
  const traverse = (node, sums) => {
    if (!node) return;
    if (
      !node.left &&
      !node.right &&
      [...sums, node.val].reduce((pre, cur) => pre + cur, 0) === targetSum
    ) {
      console.log([...sums, node.val]);
      result.push([...sums, node.val]);
    }

    traverse(node.left, [...sums, node.val]);
    traverse(node.right, [...sums, node.val]);
  };

  traverse(root, []);
  return result;
}

sumTree(root, 10);
