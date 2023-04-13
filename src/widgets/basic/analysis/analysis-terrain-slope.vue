<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        坡度坡向

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="removeSlopeData">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:单击按钮后在图上绘制区域。</p>

    <div class="f-mb">
      <a-space>
        <span class="analysis-content-lable">插值数</span>
        <mars-input-number v-model:value="txtSplitNum" :step="1" :min="1" :max="999" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="analysis-content-lable">地表渲染</span>
        <a-radio-group v-model:value="radio" @change="onChangeShadingType">
          <a-radio value="none">无阴影</a-radio>
          <a-radio value="slope">坡度</a-radio>
          <a-radio value="aspect">坡向</a-radio>
        </a-radio-group>
      </a-space>
    </div>

    <div class="f-tac">
      <a-space>
        <mars-button @click="onClickDrawSlopeExtent">绘制矩形</mars-button>
        <mars-button @click="onClickDrawSlope">绘制多边形</mars-button>
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
  mapWork.onMountedTerrainSlope()
})
onUnmounted(() => {
  mapWork.onUnmountedTerrainSlope()
})

// 插值数
const txtSplitNum = ref(10)

const onClickDrawSlopeExtent = () => {
  mapWork.onClickDrawSlopeExtent(txtSplitNum.value)
}
const onClickDrawSlope = () => {
  mapWork.onClickDrawSlope(txtSplitNum.value)
}
// 改变地表渲染参数
const radio = ref("none")
const onChangeShadingType = () => {
  mapWork.onChangeShadingType(radio.value)
}

const removeSlopeData = () => {
  mapWork.removeSlopeData()
}
</script>
<style scoped lang="less">
.analysis-content-lable {
  display: block;
  width: 60px;
  text-align: right;
  color: #fff;
}
</style>
