<template>
  <mars-dialog :draggable="false" top="10" right="282">
    <a-space>
      <span>左侧图层：</span>
      <mars-select size="small" v-model:value="leftLayer" :options="leftOptions" @change="leftLayeChange"></mars-select>
      <span>右侧图层</span>
      <mars-select size="small" v-model:value="rightLayer" :options="rightOptions" @change="rightLayerChange"></mars-select>
      <mars-icon icon="close" width="16" class="close-btn" @click="back"></mars-icon>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { disable } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

const mapLayer = ref<any>([])
const layers: Record<string, any> = {}

const leftLayer = ref<string>("离线地图 (供参考)")
const rightLayer = ref<string>("单张图片(本地离线)")

const leftOptions = computed(() => mapLayer.value.filter((m: any) => m.value !== rightLayer.value && m.label !== rightLayer.value))
const rightOptions = computed(() => mapLayer.value.filter((m: any) => m.value !== leftLayer.value && m.label !== leftLayer.value))

onMounted(() => {
  const tileLayers = mapWork.getTileLayers()
  for (let i = 0; i < tileLayers.length; i++) {
    const layer = tileLayers[i]
    if (layer.isPrivate || layer.parent || layer.options.mapSplit === false) {
      continue
    }

    const options = layer.toJSON()
    options.private = true

    delete options.id
    delete options.pid
    delete options.show

    const splitTileLayer = mapWork.creatTitle(options)
    mapLayer.value.push({
      label: splitTileLayer.options.name,
      value: splitTileLayer.options.id
    })
    layers[splitTileLayer.options.id] = splitTileLayer
  }
})

// 左边地图切换
const leftLayeChange = (id: string) => {
  mapWork.leftLayeChange(layers[id])
}

// 右边地图切换
const rightLayerChange = (id: string) => {
  mapWork.rightLayerChange(layers[id])
}

const back = () => {
  disable("map-split")
}
</script>

<style lang="less" scoped>
.close-btn {
  border: none;
  vertical-align: middle;
  cursor: pointer;
}
</style>
