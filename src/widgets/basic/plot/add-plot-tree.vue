<template>
  <mars-dialog :title="title ? '新增分组' : '重命名分组'" width="260" top="10" left="40%">
    <div class="f-pt">
      <a-space>
        <mars-input v-model:value="treeName" placeholder="请输入名称"></mars-input>
        <mars-button @click="onClickTreeNameOk">确定</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { onMounted, toRaw, ref } from "vue"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { currentWidget, disable } = useWidget()
const treeName = ref("")
const title = ref(true)

// 确定是新增名还是重命名
onMounted(() => {
  title.value = currentWidget.data.title
  treeName.value = currentWidget.data.inputName
})

// 命名确定
const onClickTreeNameOk = () => {
  const layerId = toRaw(currentWidget.data.layerId)
  mapWork.addNewPlotTree(layerId, treeName.value, title.value)
  disable("addPlotTree")
  const updateListTree = currentWidget.data.updateListTree
  if (updateListTree) {
    updateListTree()
  }
}
</script>
<style lang="less" scoped></style>
