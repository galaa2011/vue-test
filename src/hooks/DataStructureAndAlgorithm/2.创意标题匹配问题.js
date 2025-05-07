/* 
创意标题匹配问题

在广告平台中，为了给广告主一定的自由性和效率，允许广告主在创造标题的时候以通配符的方式进行创意提交。
线上服务的时候，会根据用户的搜索词触发的 bidword 对创意中的通配符（通配符是用成对 {} 括起来的字符串，
可以包含 0 个或者多个字符）进行替换，用来提升广告投放体验。例如：“{末日血战} 上线送 SSR 英雄，三天集齐无敌阵容！”，
会被替换成“帝国时代游戏下载上线送 SSR 英雄，三天集齐无敌阵容！”。给定一个含有通配符的创意和n个标题，判断这句标题是否从该创意替换生成的。
 
测试样例
样例1：
输入：n = 4, template = "ad{xyz}cdc{y}f{x}e", titles = ["adcdcefdfeffe", "adcdcefdfeff", "dcdcefdfeffe", "adcdcfe"]
输出："True,False,False,True"
 */
function solution(n, template_, titles) {
  // Please write your code here
  const reg = new RegExp("^" + template_.replace(/\{[^{}]*\}/g, "(.*)") + "$");
  const result = titles.map((title) => {
    return reg.test(title) ? "True" : "False";
  });
  return result.join();
}

function main() {
  //  You can add more test cases here
  const testTitles1 = [
    "adcdcefdfeffe",
    "adcdcefdfeff",
    "dcdcefdfeffe",
    "adcdcfe",
  ];
  const testTitles2 = [
    "CLSomGhcQNvFuzENTAMLCqxBdj",
    "CLSomNvFuXTASzENTAMLCqxBdj",
    "CLSomFuXTASzExBdj",
    "CLSoQNvFuMLCqxBdj",
    "SovFuXTASzENTAMLCq",
    "mGhcQNvFuXTASzENTAMLCqx",
  ];
  const testTitles3 = ["abcdefg", "abefg", "efg"];

  console.log(
    solution(4, "ad{xyz}cdc{y}f{x}e", testTitles1) === "True,False,False,True"
  );
  console.log(
    solution(6, "{xxx}h{cQ}N{vF}u{XTA}S{NTA}MLCq{yyy}", testTitles2) ===
      "False,False,False,False,False,True"
  );
  console.log(solution(3, "a{bdc}efg", testTitles3) === "True,True,False");
}

main();
