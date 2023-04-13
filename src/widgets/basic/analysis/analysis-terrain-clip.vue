<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        地形开挖

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="removeAll">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:单击“矩形开挖”或“多边形开挖”按钮开始绘制开挖区域。</p>

    <div class="f-mb f-tac">
      <a-space>
        <span class="mars-pannel-item-label">开挖深度：</span>
        <mars-input-number v-model:value="txtHeight" @change="onChangeClipHeight" :step="1" :min="-500" :max="999" />
        （米）
      </a-space>
    </div>
    <div class="f-tac">
      <a-space>
        <mars-button @click="onClickDrawExtent">添加矩形</mars-button>
        <mars-button @click="onClickDraw">添加多边形</mars-button>
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
  mapWork.onMountedTerrainClip()
})
onUnmounted(() => {
  mapWork.onUnmountedTerrainClip()
})

const txtHeight = ref<number>(50)

// 改变切割的深度
const onChangeClipHeight = () => {
  mapWork.onChangeClipHeight(txtHeight.value)
}

// 添加矩形
const onClickDrawExtent = () => {
  mapWork.onClickDrawExtent(txtHeight.value)
}
// 添加多边形
const onClickDraw = () => {
  mapWork.onClickDraw(txtHeight.value)
}
// 清除
const removeAll = () => {
  mapWork.removeAll()
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 70px;
}
</style>
