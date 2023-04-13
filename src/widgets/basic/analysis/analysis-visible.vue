<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        可视域

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="removeVisible">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:单击按钮后在图上绘制，红色代表不可视，绿色代表可视。</p>

    <div class="f-mb">
      <a-space>
        <span>四周方向:</span>
        <mars-slider v-model:value="headingVal" @change="onChangeHeading" :min="0" :max="360" :step="1" />值{{ headingVal }}
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>视角距离:</span>
        <mars-slider v-model:value="distanceVal" @change="distance" :min="1" :max="5000" :step="1" />值{{ distanceVal }}
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>透 明 度:</span>
        <mars-slider v-model:value="opacityVal" @change="onChangeOpacity" :min="0" :max="1" :step="0.1" />值{{ opacityVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>视椎线框:</span>
        <a-checkbox @change="chkDebugFrustum" v-model:checked="checked">显示框线</a-checkbox>
      </a-space>
    </div>
    <div class="f-tac">
      <a-space>
        <mars-button @click="addPoint">添加可视域</mars-button>
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
  mapWork.onMountedVisible()
})
onUnmounted(() => {
  mapWork.onUnmountedVisible()
})

const checked = ref<boolean>(true)

const headingVal = ref<number>(0)
const opacityVal = ref<number>(0.8)
const distanceVal = ref<number>(1000)

// 四周方向
const onChangeHeading = () => {
  mapWork.getLastViewShed("heading", headingVal.value)
}

// 透明度
const onChangeOpacity = () => {
  mapWork.getLastViewShed("opacity", opacityVal.value)
}

// 视角距离
const distance = () => {
  mapWork.getLastViewShed("distance", distanceVal.value)
}

// 视椎线框
const chkDebugFrustum = () => {
  mapWork.getLastViewShed("showFrustum", checked.value)
}

const addPoint = () => {
  mapWork.drawViewShed(opacityVal.value, checked.value).then((e) => {
    headingVal.value = Math.round(e.heading)
    distanceVal.value = Math.round(e.distance)
  })
}

const removeVisible = () => {
  mapWork.clearVisible()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 145px !important;
}
</style>
