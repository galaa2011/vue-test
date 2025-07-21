<template>
  <div class="lottery-container">
    <h1>团建抽奖系统</h1>

    <div class="control-panel">
      <el-input
        v-model="newPerson"
        placeholder="输入参与者姓名"
        @keyup.enter="addPerson"
      >
        <template #append>
          <el-button @click="addPerson">添加</el-button>
        </template>
      </el-input>

      <div class="prize-selection">
        <span class="prize-label">选择奖项:</span>
        <el-radio-group v-model="currentPrizeLevel" size="large">
          <el-radio-button :label="1">一等奖</el-radio-button>
          <el-radio-button :label="2">二等奖</el-radio-button>
          <el-radio-button :label="3">三等奖</el-radio-button>
          <el-radio-button :label="4">四等奖</el-radio-button>
          <el-radio-button :label="5">五等奖</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 新增：每次抽取人数输入框 -->
      <div class="draw-count-setting">
        <span class="prize-label">每次抽取人数:</span>
        <el-input-number
          v-model="drawCount"
          :min="1"
          :max="availablePersons.length"
        />
      </div>

      <div class="button-group">
        <el-button type="danger" @click="resetAll">重置</el-button>
        <el-button type="primary" @click="toggleLottery" :disabled="!canStart">
          {{ isRunning ? "停止抽奖" : "开始抽奖" }}
        </el-button>
      </div>
    </div>

    <div class="lottery-display">
      <div class="lottery-box" :class="`prize-level-${currentPrizeLevel}`">
        <div class="prize-level-indicator">
          {{ getPrizeLevelName(currentPrizeLevel) }}
        </div>
        <div class="lottery-animation" :class="{ running: isRunning }">
          <div v-if="currentPersons.length" class="lottery-result">
            <div v-for="person in currentPersons" :key="person">
              {{ person }}
            </div>
          </div>
          <div v-else class="lottery-placeholder">等待抽奖</div>
        </div>
      </div>
    </div>

    <div class="lottery-info">
      <div class="participants-panel">
        <h3>参与抽奖名单 ({{ availablePersons.length }}人)</h3>
        <div class="participants-list">
          <el-tag
            v-for="person in availablePersons"
            :key="person"
            class="participant-tag"
            effect="plain"
          >
            {{ person }}
          </el-tag>
        </div>
      </div>

      <div class="winners-panel">
        <h3>已抽中名单 ({{ totalWinners }}人)</h3>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item v-for="level in 5" :key="level" :name="level">
            <template #title>
              <span class="prize-level-title"
                >{{ getPrizeLevelName(level) }}
                <span class="winner-count"
                  >({{ getWinnersByLevel(level).length }}人)</span
                >
              </span>
            </template>
            <div class="winners-list">
              <el-tag
                v-for="(winner, index) in getWinnersByLevel(level)"
                :key="winner.id"
                :type="getPrizeTagType(level)"
                class="winner-tag"
              >
                {{ index + 1 }}. {{ winner.name }}
              </el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 定义中奖者接口
interface Winner {
  id: number;
  name: string;
  level: number; // 奖项等级：1-5 分别对应一等奖到五等奖
}

// 所有参与者列表
const allPersons = ref<string[]>([
  "赵鹏",
  "慕李娜",
  "孙智鹏",
  "李苗",
  "马瑞鹏",
  "张甜甜",
  "杨永生",
  "黄佳明",
  "贾磊",
  "饶婷",
  "原鑫",
  "张德利",
]);

// 已中奖人员列表
const winners = ref<Winner[]>([]);

// 当前显示的人员
const currentPerson = ref<string>("");

// 抽奖是否正在运行
const isRunning = ref<boolean>(false);

// 新增参与者输入
const newPerson = ref<string>("");

// 当前选择的奖项等级
const currentPrizeLevel = ref<number>(1);

// 折叠面板激活的项
const activeCollapse = ref<number[]>([1, 2, 3, 4, 5]);

// 抽奖动画定时器
let animationTimer: number | null = null;

// 抽奖结果定时器
let resultTimer: number | null = null;

// 用于生成唯一ID
let winnerIdCounter = 0;

// 新增：每次抽取人数
const drawCount = ref<number>(1);

// 当前显示的人员（支持多名）
const currentPersons = ref<string[]>([]);

// 计算可参与抽奖的人员（排除已中奖的人员）
const availablePersons = computed(() => {
  const winnerNames = winners.value.map((winner) => winner.name);
  return allPersons.value.filter((person) => !winnerNames.includes(person));
});

// 计算总中奖人数
const totalWinners = computed(() => {
  return winners.value.length;
});

// 是否可以开始抽奖
const canStart = computed(() => {
  return availablePersons.value.length > 0;
});

// 获取奖项等级名称
const getPrizeLevelName = (level: number): string => {
  const levelNames = {
    1: "一等奖",
    2: "二等奖",
    3: "三等奖",
    4: "四等奖",
    5: "五等奖",
  };
  return levelNames[level as keyof typeof levelNames] || "未知奖项";
};

// 获取奖项标签类型
const getPrizeTagType = (level: number): string => {
  const typeMap: Record<number, string> = {
    1: "danger",
    2: "warning",
    3: "success",
    4: "info",
    5: "",
  };
  return typeMap[level] || "";
};

// 按奖项等级获取中奖者列表
const getWinnersByLevel = (level: number): Winner[] => {
  return winners.value.filter((winner) => winner.level === level);
};

// 添加参与者
const addPerson = () => {
  if (!newPerson.value.trim()) return;

  // 检查是否已存在
  if (!allPersons.value.includes(newPerson.value.trim())) {
    allPersons.value.push(newPerson.value.trim());
  }

  newPerson.value = "";
};

// 开始/停止抽奖
const toggleLottery = () => {
  if (isRunning.value) {
    stopLottery();
  } else {
    startLottery();
  }
};

// 开始抽奖动画
const startLottery = () => {
  if (!canStart.value) return;

  isRunning.value = true;

  animationTimer = window.setInterval(() => {
    const availableList = availablePersons.value.slice();
    const count = Math.min(drawCount.value, availableList.length);
    // 随机抽取count个人
    const randomPersons: string[] = [];
    while (randomPersons.length < count && availableList.length > 0) {
      const idx = Math.floor(Math.random() * availableList.length);
      randomPersons.push(availableList[idx]);
      availableList.splice(idx, 1);
    }
    currentPersons.value = randomPersons;
  }, 30);

  const randomDuration = Math.floor(Math.random() * 2000) + 2000;
  resultTimer = window.setTimeout(() => {
    stopLottery();
  }, randomDuration);
};

// 停止抽奖并显示结果
const stopLottery = () => {
  isRunning.value = false;

  if (animationTimer !== null) {
    clearInterval(animationTimer);
    animationTimer = null;
  }

  if (resultTimer !== null) {
    clearTimeout(resultTimer);
    resultTimer = null;
  }

  // 添加到中奖名单
  if (currentPersons.value.length) {
    const winnerNames = winners.value.map((w) => w.name);
    currentPersons.value.forEach((person) => {
      if (!winnerNames.includes(person)) {
        winners.value.push({
          id: ++winnerIdCounter,
          name: person,
          level: currentPrizeLevel.value,
        });
      }
    });
  }
};

// 重置所有数据
const resetAll = () => {
  if (isRunning.value) {
    stopLottery();
  }
  winners.value = [];
  currentPersons.value = [];
  winnerIdCounter = 0;
};
</script>

<style lang="less" scoped>
.lottery-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #409eff;
  }

  .control-panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;

    .prize-selection {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;

      .prize-label {
        margin-right: 10px;
        font-weight: bold;
      }
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
  }

  .lottery-display {
    margin-bottom: 30px;

    .lottery-box {
      position: relative;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #f5f7fa;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;

      .prize-level-indicator {
        position: absolute;
        top: 10px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding: 5px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
      }

      &.prize-level-1 {
        background: linear-gradient(135deg, #fff3f3, #ffdddd);
        border: 2px solid #f56c6c;

        .prize-level-indicator {
          background-color: rgba(245, 108, 108, 0.7);
        }
      }

      &.prize-level-2 {
        background: linear-gradient(135deg, #fff8e6, #ffefc7);
        border: 2px solid #e6a23c;

        .prize-level-indicator {
          background-color: rgba(230, 162, 60, 0.7);
        }
      }

      &.prize-level-3 {
        background: linear-gradient(135deg, #f0f9eb, #e1f3d8);
        border: 2px solid #67c23a;

        .prize-level-indicator {
          background-color: rgba(103, 194, 58, 0.7);
        }
      }

      &.prize-level-4 {
        background: linear-gradient(135deg, #ecf5ff, #d9ecff);
        border: 2px solid #409eff;

        .prize-level-indicator {
          background-color: rgba(64, 158, 255, 0.7);
        }
      }

      &.prize-level-5 {
        background: linear-gradient(135deg, #f5f7fa, #e4e7ed);
        border: 2px solid #909399;

        .prize-level-indicator {
          background-color: rgba(144, 147, 153, 0.7);
        }
      }

      .lottery-animation {
        font-size: 42px;
        font-weight: bold;
        color: #303133;
        transition: transform 0.2s ease;
        margin-top: 15px;

        &.running {
          animation: jump 0.05s infinite alternate;
        }
      }

      .lottery-result {
        padding: 20px;
        text-align: center;
      }

      .lottery-placeholder {
        color: #909399;
      }
    }
  }

  .lottery-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .participants-panel,
    .winners-panel {
      background-color: #f5f7fa;
      border-radius: 8px;
      padding: 15px;

      h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #303133;
      }
    }

    .participants-list,
    .winners-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .participant-tag,
      .winner-tag {
        margin-bottom: 8px;
      }
    }

    .prize-level-title {
      font-weight: bold;
      display: flex;
      align-items: center;

      .winner-count {
        font-size: 0.9em;
        margin-left: 8px;
        color: #909399;
        font-weight: normal;
      }
    }
  }
}

@keyframes jump {
  0% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(8px);
  }
}
</style>
