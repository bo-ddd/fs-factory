<template>
  <mars-dialog :draggable="false" :width="490" :right="10" :top="10">
    <a-space>
      <span>尺寸</span>
      <mars-select v-model:value="selectVal" ref="select" style="width: 200px" :options="sizeOptions" @change="onSizeChange" />
      <mars-button @click="expImage">
        <mars-icon icon="image-files" width="18"></mars-icon>
        存为图片
      </mars-button>
      <mars-button @click="printImage">
        <mars-icon icon="printer" width="18"></mars-icon>
        打印
      </mars-button>
      <mars-icon icon="close" width="16" @click="back"></mars-icon>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { activate, disable } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

// 下拉框
const selectVal = ref<string>("A4H")
const sizeOptions = [
  {
    value: "A4H",
    label: "A4纸横向"
  },
  {
    value: "A4Z",
    label: "A4纸纵向"
  },
  {
    value: "A3H",
    label: "A3纸横向"
  },
  {
    value: "A3Z",
    label: "A3纸纵向"
  }
]
const onSizeChange = () => {
  mapWork.changeSize(selectVal.value)
}

// 保存为图片
const expImage = () => {
  mapWork.expImage()
}

// 打印图片
const printImage = () => {
  mapWork.printview()
}

// 退出
const back = () => {
  disable("print")
}

onUnmounted(() => {
  activate(["query-poi", "toolbar"])
})
</script>

<style lang="less"></style>
