<template>
  <mars-dialog :draggable="false" customClass="base-pannel" right="10" top="10">
    <template v-for="(item, i) in data" :key="i">
      <div v-if="item.widget && !item.children" class="toolbar-item" @click="showWidget(item.widget)">
        <mars-icon :icon="item.icon" width="18"></mars-icon>
        <span class="title">{{ item.name }}</span>
      </div>
      <mars-dropdown-menu v-if="item.children && !item.widget" trigger="hover" placement="bottomRight">
        <div class="toolbar-item">
          <mars-icon :icon="item.icon" width="18"></mars-icon>
          <span class="title">{{ item.name }}</span>
          <mars-icon icon="down" width="18"></mars-icon>
        </div>
        <template #overlay>
          <a-menu @click="clickMenu">
            <a-menu-item v-for="child in item.children" :key="child.widget" :title="child.title||child.name">
              <mars-icon :icon="child.icon" width="18"></mars-icon>
              <span>{{ child.name }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </mars-dropdown-menu>
    </template>
  </mars-dialog>
</template>

<script setup lang="ts">
/**
 * 导航菜单按钮 （右上角）
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import { useWidget } from "@mars/common/store/widget"

const { activate } = useWidget()

const data = window.toolBarMenuData || []

const showWidget = (widget: string) => {
  activate(widget)
}

const clickMenu = ({ key }: any) => {
  showWidget(key)
}
</script>

<style lang="less">
.base-pannel {
  padding: 0 !important;
  background-image: none !important;
  border: 1px solid;
  border: none;
  border-radius: 2px !important;
  background-color: var(--mars-bg-base);
  height: 40px;
  .toolbar-item {
    display: inline-block;
    padding: 6px 12px;
    height: 100%;
    color: var(--mars-text-color);
    font-size: 15px;
    &:hover {
      background-color: var(--mars-select-bg);
    }
  }
  .mars-icon {
    margin-right: 5px;
    color: var(--mars-text-color);
  }
}
</style>
