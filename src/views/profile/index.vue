<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import { delay, subBefore, useResizeObserver } from "@pureadmin/utils";

import DialogVue from "@/views/schema-form/form/dialog.vue";
import TestVue from "@/views/system/role/test.vue";

defineOptions({
  name: "SystemRole"
});

const tableRef = ref();
const contentRef = ref();
const treeHeight = ref();
const panelsRef = ref(null);

const rendContent = (val: string) =>
  `代码位置：src/views/table/edit/${val}/index.vue`;

const list = [
  {
    key: "demo1",
    content: rendContent("Cloud"),
    title: "Cloud",
    component: TestVue
  },
  {
    key: "demo1",
    content: rendContent("Local"),
    title: "Local",
    component: TestVue
  },
  {
    key: "demo1",
    content: rendContent("Group"),
    title: "Group",
    component: TestVue
  },
  {
    key: "demo1",
    content: rendContent("Team"),
    title: "Team",
    component: TestVue
  }
];

const selected = ref(0);

function tabClick({ index }) {
  selected.value = index;
}

onMounted(() => {
  useResizeObserver(contentRef, async () => {
    await nextTick();
    delay(60).then(() => {
      treeHeight.value = parseFloat(
        subBefore(tableRef.value.getTableDoms().tableWrapper.style.height, "px")
      );
    });
  });
});
</script>

<template>
  <div class="main">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card shadow="never">
          <el-tabs @tab-click="tabClick">
            <template v-for="(item, index) of list" :key="item.key">
              <el-tab-pane :lazy="true">
                <template #label>
                  <div class="circle">
                    <span v-if="panelsRef && index == 0" class="number">
                      {{ panelsRef[0].dataList.length }}</span
                    >
                    <span v-else class="number">0</span>
                  </div>
                  <span
                    v-tippy="{
                      maxWidth: 'none',
                      content: `（第 ${index + 1} 个示例）${item.content}`
                    }"
                  >
                    {{ item.title }}
                  </span>
                </template>
                <component
                  :is="item.component"
                  v-if="selected == index"
                  ref="panelsRef"
                />
              </el-tab-pane>
            </template>
          </el-tabs>
        </el-card>
      </el-col>

      <!-- <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
        <dialog-vue title="text"></dialog-vue>
      </el-col> -->
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

:deep(.el-overlay) {
  position: relative !important;
  background-color: transparent !important;

  .el-overlay-dialog {
    position: relative !important;
  }

  .el-dialog {
    margin-top: 0 !important;
    width: 100% !important;
  }
}

:deep(.el-form-item__label) {
  width: 150px !important;
}

// Define variables for circle size, colors, and number style
$circle-size: 18px;
$circle-color: #f0f0f0; // Light grey
$number-color: #333; // Dark grey
$number-font-size: 13px;

// Styles for the circle
.circle {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
  background-color: $circle-color;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  // Styles for the number inside the circle
  .number {
    color: $number-color;
    font-size: $number-font-size;
  }
}
</style>
