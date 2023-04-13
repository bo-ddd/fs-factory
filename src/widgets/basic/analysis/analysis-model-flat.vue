<template>
  <div class="analysis-common">
    <p class="analysis-common-title">
      <a-space>
        <mars-button type="link" @click="goAnalysisOtherView('analysis')">
          <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
        </mars-button>
        模型压平

        <div class="analysis-common-title_small">
          <mars-button type="link" title="清除" @click="clearModelFlatData">
            <mars-icon icon="delete" width="18"></mars-icon>
          </mars-button>
        </div>
      </a-space>
    </p>

    <p class="analysis-content_tip">提示: 1、只支持部分模型压平(如有带着色器的)； 2、部分模型的压平可能存在异常(如缩放出现碎片现象)</p>

    <div class="f-mb">
      <a-space>
        <span> 选择模型： </span>
        <span> {{ checkedModel }} </span>
        <mars-button @click="onCheckedModel">图上选点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>压平区高度: </span>
        <mars-input-number v-model:value="modelFlatHeight" @change="onChangeFlatHeight" :step="1" />
      </a-space>
    </div>

    <div class="f-tac f-push-20-t">
      <a-space>
        <mars-button @click="onDrawExtent">绘制矩形</mars-button>
        <mars-button @click="onDraw">绘制多变形</mars-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, onMounted } from "vue"
import * as mapWork from "./map"

const emit = defineEmits(["goAnalysisOtherView"])

function goAnalysisOtherView(name: string) {
  emit("goAnalysisOtherView", name)
}

onMounted(() => {
  // 以下为了演示功能，实际项目请注释
  const name = mapWork.onMountedModelFlat()
  checkedModel.value = "已选择“" + name + "”"
})

onUnmounted(() => {
  mapWork.onUnmountedModelFlat()
})

// 选择模型
const checkedModel = ref<string>("未选择")
const onCheckedModel = () => {
  mapWork.onCheckedModelFlat().then((name) => {
    checkedModel.value = name ? "已选择“" + name + "”" : "未选择"
  })
}

// 模型的压平高度
const modelFlatHeight = ref<number>(0)
const onChangeFlatHeight = () => {
  mapWork.onChangeFlatHeight(modelFlatHeight.value)
}

// 绘制矩形
const onDrawExtent = () => {
  mapWork.onDrawExtent(modelFlatHeight.value)
}
// 绘制多边形
const onDraw = () => {
  mapWork.onDraw(modelFlatHeight.value)
}

// 清除剖切的数据
const clearModelFlatData = () => {
  mapWork.clearModelFlatData()
}
</script>
<style scoped lang="less"></style>
