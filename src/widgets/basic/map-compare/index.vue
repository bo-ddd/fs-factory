<template>
  <mars-dialog title="分屏对比" :width="260" :top="60" :bottom="60" :left="10">
    <mars-tree checkable :tree-data="layersTree" v-model:expandedKeys="expandedKeys" @check="checkedChange" v-model:checkedKeys="checkedKeys">
      <template #title="{ title }">
        <span class="tree-style" :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

interface Layers {
  index: number
  title: string
  key: string
  id: string
  pId: string
  children?: any
  parent?: any
}

const layersTree = ref<any[]>([])
const expandedKeys = ref<string[]>([])
const checkedKeys = ref<string[]>([])
const layersObj: any = {}

onMounted(() => {
  const getLayers = mapWork.getAllLayers()
  initTree(getLayers)
})

// 初始化树构件
function initTree(layers: any) {
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i] // 创建图层
    if (layer && layer.pid === -1 && layer.id !== 10) {
      const node: Layers = reactive({
        index: i,
        title: layer.name,
        key: layer.id,
        id: layer.id,
        pId: layer.pid
      })
      node.children = findChild(node, layers)
      layersTree.value.push(node)
      expandedKeys.value.push(node.key)
    }
  }
}

// 查找子节点
function findChild(parent: Layers, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any, i: number) => {
      const node: Layers = {
        index: i,
        title: item.name,
        key: item.id,
        id: item.id,
        pId: item.pid,
        parent: parent
      }
      layersObj[item.id] = item
      node.children = findChild(node, list)
      expandedKeys.value.push(node.key)
      if (item.isAdded && item.show) {
        nextTick(() => {
          checkedKeys.value.push(node.key)
        })
      }
      return node
    })
}

// 选中复选框
const checkedChange = (keys: string[], e: any) => {
  const layer = layersObj[e.node.id]
  if (layer) {
    if (!layer.isAdded) {
      mapWork.addLayer(layer)
    }
    if (keys.indexOf(e.node.id) !== -1) {
      layer.show = true
      layer.flyTo()
    } else {
      layer.show = false
    }
  }
}
</script>
<style lang="less"></style>
