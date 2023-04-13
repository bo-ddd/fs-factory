<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        限高分析

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="removeModelLimitData">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <div class="f-mb f-pt">
      <a-space>
        <span>地表海拔:</span>
        <span>{{ bottomHeight }}米</span>
        <mars-button @click="onMapClickPoint">图上选点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>限制高度:</span>
        <mars-slider @change="onChangeLimitHeight" v-model:value="sliderLimit" :min="0" :max="180" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>当前高度:</span>
        {{ sliderLimit }}米
      </a-space>
    </div>

    <div class="limit-mb">
      <a-space>
        <span>分析区域:</span>
        <mars-button @click="onDrawModelLimitExtent">绘制矩形</mars-button>
        <mars-button @click="onDrawModelLimitPloy">绘制面</mars-button>
      </a-space>
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
  mapWork.onMountedModelLimit()
})
onUnmounted(() => {
  mapWork.onUnmountedModelLimit()
})

const removeModelLimitData = () => {
  mapWork.removeModelLimitData()
}

// 地表高度
const bottomHeight = ref<number>(0)
const onMapClickPoint = () => {
  mapWork.onMapClickPoint().then((e) => {
    bottomHeight.value = e
  })
}

// 绘制矩形
const onDrawModelLimitExtent = () => {
  mapWork.onDrawModelLimitExtent()
}
// 绘制矩形
const onDrawModelLimitPloy = () => {
  mapWork.onDrawModelLimitPloy()
}

// 限制高度 滑动条
const sliderLimit = ref<number>(80)
const onChangeLimitHeight = () => {
  mapWork.onChangeLimitHeight(sliderLimit.value)
}
</script>
<style scoped lang="less">
.f-pt {
  margin-top: 10px;
}
.ant-slider {
  width: 180px;
}
.limit-mb {
  margin-bottom: 20px;
}
</style>
