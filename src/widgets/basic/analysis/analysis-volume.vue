<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        方量分析

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="clear">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:请首先单击 “绘制区域” 按钮，再在图上绘制分析区域。</p>

    <div class="volume-content f-mb">
      <a-space>
        <span>基准面高(米):</span>
        <mars-input-number @change="baseHeight" v-model:value="baseValue" step="0.1" />
        <mars-button v-if="showSelHeight" @click="selHeight">点选高度</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>围墙底高(米):</span>
        <mars-input-number @change="txtMinHeight" v-model:value="bottomValue" step="0.1" />
        （可选）
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>围墙顶高(米):</span>
        <mars-input-number @change="txtMaxHeight" v-model:value="topValue" step="0.1" />
        （可选）
      </a-space>
    </div>
    <div class="f-tac">
      <mars-button @click="analysisMeasure">绘制区域</mars-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import * as mapWork from "./map"

const emit = defineEmits(["goAnalysisOtherView"])

function goAnalysisOtherView(name: string) {
  emit("goAnalysisOtherView", name)
}

onMounted(() => {
  mapWork.onMountedVolume()
})
onUnmounted(() => {
  mapWork.onUnmountedVolume()
  mapWork.eventTarget.off("heightVal", heightVal)
})

const showSelHeight = ref<boolean>(false)

const baseValue = ref<number>()

const bottomValue = ref<number>()

const topValue = ref<number>()

// 方量分析
const analysisMeasure = () => {
  mapWork.analysisMeasure()
}
// 清除
const clear = () => {
  mapWork.clear()

  showSelHeight.value = false
}

// 基础高度修改
const baseHeight = () => {
  mapWork.baseHeight(baseValue.value)
}

// 修改底高
const txtMinHeight = () => {
  mapWork.txtMinHeight(bottomValue.value)
}

// 修改顶高
const txtMaxHeight = () => {
  mapWork.txtMaxHeight(topValue.value)
}

// 点选高度
const selHeight = () => {
  mapWork.selHeight()
}

mapWork.eventTarget.on("heightVal", heightVal)
function heightVal(event: { baseHeight: number; minHeight: number; maxHeight: number }) {
  showSelHeight.value = true
  baseValue.value = event.baseHeight
  bottomValue.value = event.minHeight
  topValue.value = event.maxHeight
}
</script>
<style scoped lang="less">
.volume-content {
  width: 300px;
}
.f-tac {
  margin-top: 20px;
}
.analysis-common {
  :deep(.mars-input-number) {
    width: 125px;
  }
}
</style>
