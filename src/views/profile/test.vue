<script setup lang="ts">
import { useRole } from "./utils/hook";
import { ref, computed, nextTick, onMounted } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import {
  delay,
  subBefore,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";

import Database from "@iconify-icons/ri/database-2-line";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Close from "@iconify-icons/ep/close";
import Check from "@iconify-icons/ep/check";
import More from "@iconify-icons/ep/more-filled";
import DialogVue from "@/views/schema-form/form/dialog.vue";

defineOptions({
  name: "SystemRole"
});

const iconClass = computed(() => {
  return [
    "w-[22px]",
    "h-[22px]",
    "flex",
    "justify-center",
    "items-center",
    "outline-none",
    "rounded-[4px]",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-[#0000000f]",
    "dark:hover:bg-[#ffffff1f]",
    "dark:hover:text-[#ffffffd9]"
  ];
});

const treeRef = ref();
const formRef = ref();
const tableRef = ref();
const contentRef = ref();
const treeHeight = ref();

const rendContent = (val: string) =>
  `代码位置：src/views/table/edit/${val}/index.vue`;

const functionButtonsData: any = [
  {
    id: 1,
    text: "Start 1 profiles",
    action: "startProfiles",
    type: "primary",
    iconClass: "play-icon",
    icon: EditPen
  },
  {
    id: 2,
    text: "Stop 1 profiles",
    action: "stopProfiles",
    iconClass: "stop-icon",
    type: "danger",
    plain: true,
    icon: Refresh
  },
  {
    id: 3,
    text: "Assign to group",
    action: "assignGroup",
    iconClass: "user-plus-icon",
    type: "primary",
    icon: Menu
  },
  {
    id: 4,
    text: "Share profiles",
    action: "shareProfiles",
    iconClass: "share-icon",
    type: "primary",
    icon: AddFill
  },
  {
    id: 5,
    text: "Check proxy",
    action: "checkProxy",
    iconClass: "check-icon",
    type: "primary",
    icon: Close
  },
  {
    id: 6,
    text: "Start with app",
    action: "startWithApp",
    iconClass: "start-app-icon",
    type: "primary",
    plain: true,
    icon: Check
  },
  {
    id: 7,
    text: "Update proxy",
    action: "updateProxy",
    iconClass: "update-icon",
    type: "primary",
    plain: true,
    icon: More
  },
  {
    id: 8,
    text: "Update profiles",
    action: "updateProfiles",
    iconClass: "update-profiles-icon",
    type: "primary",
    plain: true,
    icon: Close
  },
  {
    id: 9,
    text: "Share on cloud",
    action: "shareOnCloud",
    iconClass: "cloud-icon",
    type: "danger",
    plain: true,
    icon: Database
  },
  {
    id: 9,
    text: "New Finger Print",
    action: "new finger print",
    iconClass: "icon-class",
    type: "success",
    plain: true,
    icon: Refresh
  }
];

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

const {
  form,
  isShow,
  curRow,
  loading,
  columns,
  rowStyle,
  dataList,
  treeData,
  treeProps,
  isLinkage,
  pagination,
  isExpandAll,
  isSelectAll,
  treeSearchValue,
  buttonClass,
  // buttonClass,
  onSearch,
  resetForm,
  openDialog,
  handleMenu,
  handleSave,
  handleDelete,
  filterMethod,
  transformI18n,
  onQueryChanged,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole(treeRef);

defineExpose({ dataList });

const dialogVisible = ref(false);

const gridData = [
  {
    date: "2016-05-02",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District"
  },
  {
    date: "2016-05-04",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District"
  },
  {
    date: "2016-05-01",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District"
  },
  {
    date: "2016-05-03",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District"
  }
];

const tableData = [
  { key: "Profile Name", value: "-" },
  { key: "Browser", value: "Chrome" },
  { key: "OS", value: "Mac OS" },
  {
    key: "User Agent",
    value:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  },
  { key: "Screen Resolution", value: "1024,768" },
  { key: "CPU", value: "8" },
  { key: "Start URL", value: "-" },
  { key: "Proxy", value: "withoutProxy" },
  { key: "WEB RTC", value: "Real" },
  { key: "Timezone", value: "Asia/Bangkok" },
  { key: "Geolocation", value: "Prompt" },
  { key: "Canvas", value: "Off" },
  { key: "Client Rects", value: "Noise" },
  { key: "Audio Context", value: "Noise" },
  { key: "Font", value: "Noise" },
  { key: "WebGL", value: "Noise" },
  { key: "WebGL Vendor", value: "Google Inc. (NVIDIA)" },
  {
    key: "WebGl Renderer",
    value:
      "ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Ti (0x00001B06) Direct3D11 vs_5_0 ps_5_0, D3D11)"
  }
];
</script>

<template>
  <div class="main profile-tab">
    <div>
      <section class="search-section">
        <el-form
          ref="formRef"
          :inline="true"
          :model="form"
          class="search-form bg-bg_color overflow-auto mb-4"
        >
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="Name ...."
              clearable
              class="!w-[180px]"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="useRenderIcon('ri:search-line')"
              :loading="loading"
              @click="onSearch"
            >
              Search
            </el-button>
          </el-form-item>
        </el-form>
      </section>

      <section
        class="functional-section flex flex-wrap gap-3.5 mt-3 justify-center"
      >
        <el-button
          v-for="(data, index) in functionButtonsData"
          :key="index"
          :type="data.type"
          plain
          :icon="useRenderIcon(data.icon)"
          class="mx-0"
          @click="resetForm(formRef)"
        >
          {{ data.text }}
        </el-button>

        <el-dropdown>
          <el-button
            class="ml-3 mt-[2px]"
            link
            type="primary"
            :icon="useRenderIcon(More)"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button
                  :class="buttonClass"
                  link
                  type="default"
                  :icon="useRenderIcon(Menu)"
                  @click="handleMenu"
                >
                  菜单权限
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </section>
    </div>

    <div ref="contentRef">
      <PureTableBar
        style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
        title=""
        :columns="columns"
        @refresh="onSearch"
      >
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            row-key="id"
            :adaptiveConfig="{ offsetBottom: 108 }"
            align-whole="center"
            table-layout="auto"
            stripe
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :pagination="pagination"
            :paginationSmall="size === 'small' ? true : false"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            @selection-change="handleSelectionChange"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                type="primary"
                @click="openDialog('修改', row)"
              >
                Start
              </el-button>

              <el-dropdown>
                <el-button
                  class="ml-3 mt-[2px]"
                  link
                  type="primary"
                  :size="size"
                  :icon="useRenderIcon(More)"
                />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-button
                        class="reset-margin"
                        type="primary"
                        link
                        :size="size"
                        :icon="useRenderIcon(EditPen)"
                        @click="dialogVisible = true"
                      >
                        Details
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-popconfirm
                        teleported
                        :title="`Bạn chắc chắn muốn xoá ${row.name} ?`"
                        @confirm="handleDelete(row)"
                      >
                        <template #reference>
                          <el-button
                            class="reset-margin"
                            link
                            type="primary"
                            :size="size"
                            :icon="useRenderIcon(Delete)"
                          >
                            Xoá
                          </el-button>
                        </template>
                      </el-popconfirm>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>

    <div>
      <el-dialog v-model="dialogVisible" center align-center title="Details">
        <el-table center :data="tableData">
          <el-table-column prop="key" width="200" />
          <el-table-column prop="value" width="200" />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

:deep(.functional-section button) {
  margin-left: 0 !important;
}

.main-content {
  margin: 24px 24px 0 !important;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>

<style lang="scss">
.main.profile-tab .el-overlay {
  position: fixed !important;
  border: 1px solid #333;
  background-color: rgba(0, 0, 0, 0.5) !important;

  .el-dialog {
    width: 30% !important;
    top: 40px !important;
  }
}
</style>
