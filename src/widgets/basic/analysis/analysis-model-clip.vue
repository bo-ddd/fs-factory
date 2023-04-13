<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        模型剖切

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="removeModelClipData">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:先图上点选模型后，设置剖切方向及距离。</p>

    <div class="model-clip_direction">
      <div class="f-mb">
        <a-space>
          <span> 选择模型： </span>
          <span>{{ checkedModel }} </span>
          <mars-button @click="onCheckedModel">图上选点</mars-button>
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span> 按线剖切： </span>
          <mars-button @click="onDrawLine">绘制线</mars-button>
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span> 按面裁剪： </span>
          <mars-button @click="onDrawPoly">绘制面</mars-button>

          <a-radio-group v-model:value="radioClip" @change="onChangeOutsideClip">
            <a-radio value="0">内裁</a-radio>
            <a-radio value="1">外裁</a-radio>
          </a-radio-group>
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span> 剖切方向： </span>
          <a-radio-group v-model:value="clippingValue">
            <a-radio-button @click="mapWork.clipping('ZR')" value="1">顶</a-radio-button>
            <a-radio-button @click="mapWork.clipping('Z')" value="2">底</a-radio-button>
            <a-radio-button @click="mapWork.clipping('XR')" value="3">东</a-radio-button>
            <a-radio-button @click="mapWork.clipping('X')" value="4">西</a-radio-button>
            <a-radio-button @click="mapWork.clipping('Y')" value="5">南</a-radio-button>
            <a-radio-button @click="mapWork.clipping('YR')" value="6">北</a-radio-button>
          </a-radio-group>
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span> 剖切距离：</span>
          <mars-input-number @change="onClipDistance" v-model:value="textClipDis" :step="1" />
          <mars-slider @change="onClipDistance" v-model:value="textClipDis" :min="sliderMin" :max="sliderMax" :step="1" />
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue"
import * as mapWork from "./map"

const emit = defineEmits(["goAnalysisOtherView"])

function goAnalysisOtherView(name: string) {
  emit("goAnalysisOtherView", name)
}

onUnmounted(() => {
  mapWork.onUnmountedModelClip()
})

const textClipDis = ref<number>(0)
const radioClip = ref<string>("0")

// 绘制线
const onDrawLine = () => {
  mapWork.onDrawLine()
}

// 绘制面
const onDrawPoly = () => {
  mapWork.onDrawPoly(radioClip.value)
}

// 改变内外裁剪状态
const onChangeOutsideClip = () => {
  mapWork.onChangeOutsideClip(radioClip.value)
}

// 选择模型
const checkedModel = ref<string>("未选择")
const sliderMin = ref<number>(-100)
const sliderMax = ref<number>(100)

const onCheckedModel = () => {
  mapWork.onCheckedModel().then((e) => {
    sliderMin.value = -e.radius
    sliderMax.value = e.radius

    checkedModel.value = "已选择“" + e.name + "”"
  })
}

// 剖切距离的滑动条
const onClipDistance = () => {
  mapWork.onClipDistance(textClipDis.value)
}

// 选择方向迫切模型
const clippingValue = ref<string>("0")

// 清除剖切的数据
const removeModelClipData = () => {
  mapWork.clearModelClipData()
}
</script>
<style scoped lang="less">
.model-clip_direction {
  margin-top: 25px;
  margin-bottom: 10px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
  :deep(.ant-slider) {
    width: 145px !important;
  }
  :deep(.mars-input-number) {
    width: 53px;
  }
}
</style>
