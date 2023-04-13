<template>
  <mars-dialog :draggable="false" :width="100" :top="10" :right="10">
    <mars-button type="link" @click="back">
      <mars-icon icon="error" width="16" />
      退出街景
    </mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { disable, activate } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

// 退处街景
const back = () => {
  disable("street-view")
}

onUnmounted(() => {
  activate(["query-poi", "toolbar"])

})
</script>
<style lang="less" scoped></style>
