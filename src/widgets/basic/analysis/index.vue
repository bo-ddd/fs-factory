<template>
  <mars-dialog title="空间分析" width="330" :top="60" :right="10" :min-width="320">
    <template #icon>
      <mars-icon icon="analysis" width="18"></mars-icon>
    </template>
    <component :is="componentMap[currentView]" @goAnalysisOtherView="goAnalysisOtherView"></component>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import Analysis from "./analysis.vue"
import Sunlight from "./analysis-sunlight.vue"
import Visible from "./analysis-visible.vue"
import Volume from "./analysis-volume.vue"
import TerrainClip from "./analysis-terrain-clip.vue"
import TerrainOpacity from "./analysis-terrain-opacity.vue"
import TerrainSlope from "./analysis-terrain-slope.vue"
import ModelClip from "./analysis-model-clip.vue"
import ModelFlat from "./analysis-model-flat.vue"
import ModelLimitHeight from "./analysis-model-limit.vue"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const currentView = ref<string>("analysis")

const componentMap = {
  analysis: Analysis,
  sunlight: Sunlight,
  visible: Visible,
  volume: Volume,
  terrainClip: TerrainClip,
  terrainOpacity: TerrainOpacity,
  terrainSlope: TerrainSlope,
  modelClip: ModelClip,
  modelFlat: ModelFlat,
  modelLimitHeight: ModelLimitHeight
}

function goAnalysisOtherView(name: string) {
  currentView.value = name
}
</script>
<style lang="less" scope></style>
