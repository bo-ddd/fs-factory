<template>
  <div></div>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

onUnmounted(() => {
  // 销毁操作
})
</script>
<style lang="less"></style>
