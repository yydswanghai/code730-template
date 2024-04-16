<template>
  <div class="dashboard-container">
    <el-row :gutter="24" style="padding-right: 12px">
      <el-col :span="6" v-for="(item, idx) in li" :key="idx">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>{{ item.title }}</span>
              <el-button :type="(item.type as any)" size="small" plain>{{ item.unit }}</el-button>
            </div>
          </template>
          <div class="card-body">
            <div class="top">
              <span>{{ item.num }}</span>
            </div>
            <el-progress
              v-if="idx == 1"
              :text-inside="true"
              :stroke-width="14"
              :percentage="60" 
            />
            <div class="flex" v-else>
              <div class="text">
                {{ item.up }}<el-icon color="#00ff6f"><CaretTop /></el-icon>
              </div>
              <div class="text">
                {{ item.down }}<el-icon color="#ffde66"><CaretBottom /></el-icon>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="flex">
              <div class="text">{{ item.tText }}</div>
              <div class="text">{{ item.tNum }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="24"
      style="margin: 20px 0 20px -12px"
      justify="space-between"
    >
      <el-col :span="3" v-for="(item, idx) in list" :key="idx">
        <el-card>
          <div class="card-item" v-on="item.eventObject || {}">
            <el-icon :color="item.color" :size="32">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin: 20px 0">
      <el-button>Default</el-button>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-button type="primary">Primary</el-button>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-button type="success">Success</el-button>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-button type="info">Info  </el-button>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-button type="warning">Warning</el-button>
    </el-row>
    <el-row :gutter="24" style="margin: 20px 0">
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  CaretTop,
  User,
  CaretBottom,
  ShoppingCartFull,
  ShoppingBag,
  TrendCharts,
  CreditCard,
  Comment,
  Setting,
  PriceTag,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const li = [
  {
    title: '数据1',
    unit: '日',
    type: 'primary',
    num: '35090',
    up: '日同比 16%',
    down: '周同比 36%',
    tText: '总量1：',
    tNum: '109,256,123'
  },
  {
    title: '数据2',
    unit: '人',
    type: 'success',
    num: '15678',
    up: '日同比 10%',
    down: '周同比 2%',
    tText: '总量2：',
    tNum: '1329458'
  },
  {
    title: '数据3',
    unit: '时',
    type: 'info',
    num: '2989',
    up: '日同比 30%',
    down: '周同比 2%',
    tText: '总量3：',
    tNum: '61846'
  },
  {
    title: '数据4',
    unit: '个',
    type: 'warning',
    num: '56',
    up: '日同比 15%',
    down: '周同比 5%',
    tText: '总量4：',
    tNum: '359'
  },
];
const list = [
  {
    icon: User,
    title: "用户",
    color: "#69c0ff",
    eventObject: {
      click: () => ElMessage.success("你点击了用户")
    },
  },
  {
    icon: TrendCharts,
    title: "分析",
    color: "#69c0ff",
    eventObject: {
      click: () => ElMessage.info("你点击了分析")
    },
  },
  {
    icon: ShoppingCartFull,
    title: "商品",
    color: "#ff9c6e",
    eventObject: {
      click: () => ElMessage.error("你点击了商品")
    },
  },
  {
    icon: ShoppingBag,
    title: "订单",
    color: "#b37feb",
    eventObject: {
      click: () => ElMessage.warning("你点击了订单")
    },
  },
  {
    icon: CreditCard,
    title: "票据",
    color: "#ffd666",
    eventObject: {
      click: () => ElMessage.info("你点击了票据")
    },
  },
  {
    icon: Comment,
    title: "消息",
    color: "#5cdbd3",
    eventObject: {
      click: () => ElMessage.success("你点击了消息")
    },
  },
  {
    icon: PriceTag,
    title: "标签",
    color: "#ff85c0",
    eventObject: {
      click: () => ElMessage.warning("你点击了标签")
    },
  },
  {
    icon: Setting,
    title: "配置",
    color: "#ffc069",
    eventObject: {
      click: () => ElMessage.error("你点击了配置")
    },
  }
];

</script>
<style lang="scss" scoped>
.dashboard-container {
  padding-top: 20px;
  :deep(.el-card__body) {
    padding: 0;
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
  .card-body {
    padding: var(--el-card-padding);
    border-bottom: 1px solid var(--el-card-border-color);
    height: 110px;
    box-sizing: border-box;
    .top {
      padding: 6px 0;
      span {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
    }
  }
  .card-footer {
    padding: var(--el-card-padding);
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-item {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    span {
      margin-top: 5px;
    }
  }
}
</style>
