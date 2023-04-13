<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        地表透明
      </a-space>
    </p>

    <p class="analysis-content_tip">提示:可以透明地表，进入地下模式，可以看地下管网等数据。</p>

    <div class="f-mb">
      <a-space>
        <span class="analysis-content-lable">状态:</span>
        <a-checkbox @change="onCheckedOpacity" v-model:checked="opacityChecked">开启地表透明</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="analysis-content-lable">地表透明度:</span>
        <mars-slider @change="onChangeOpacity" v-model:value="opacityValue" :min="0" :max="1" :step="0.1" />
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
  mapWork.onMountedTerrainOpacity()
})
onUnmounted(() => {
  mapWork.onUnmountedTerrainOpacity()
})

const opacityChecked = ref<boolean>(true)
const opacityValue = ref<number>(0.5)

// 改变透明度的状态
const onCheckedOpacity = () => {
  mapWork.onCheckedOpacity(opacityChecked.value)
}

// 改变透明度的值
const onChangeOpacity = () => {
  mapWork.onChangeOpacity(opacityValue.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 125px;
}
.analysis-content-lable {
  display: block;
  width: 75px;
  text-align: right;
  color: #fff;
}
</style>
