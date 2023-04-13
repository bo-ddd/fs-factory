<template>
  <div class="detailed-plan" v-show="isShow">
    <img src="./img/tl.png" style="width: 100%; height: 100%" />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, onMounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { currentWidget } = useWidget()
const isShow = ref(false)
// 启用map.ts生命周期
useLifecycle(mapWork)

onMounted(() => {
  if (currentWidget.data.layerId === 401087) {
    isShow.value = true
  } else {
    isShow.value = false
  }

  mapWork.flyToModel(currentWidget.data.layerId, currentWidget.data.center)
})

onUnmounted(() => {
  // 销毁操作
})
</script>
<style lang="less" scoped>
.detailed-plan {
  position: absolute;
  bottom: 24px;
  left: 55px;
  height: 180px;
  width: 95.5%;
}
</style>
