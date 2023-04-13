<template>
  <div class="data-tree-title f-mb">
    <a-space>
      <p>分组管理:</p>
      <p class="title-icon" title="新增分组" @click="addNewPlotTree(true, null)">
        <mars-icon icon="plus-cross" width="14"></mars-icon>
      </p>
      <p class="title-icon" title="删除所有的空分组" @click="deleteEmptyLayer">
        <mars-icon icon="delete" width="14"></mars-icon>
      </p>
    </a-space>
  </div>
  <mars-tree draggable block-node checkable :tree-data="plotTreeData" v-model:checkedKeys="checkedKeys" @drop="onDrop" @check="onPlotTreeCheck">
    <template #title="node">
      <mars-dropdown-menu :trigger="['contextmenu']">
        <span @click="flyTo(node)">{{ node.title }}</span>
        <template #overlay>
          <a-menu v-if="node.children">
            <a-menu-item @click="onLayerMenuIsActivate(node)">置为激活分组</a-menu-item>
            <a-menu-item @click="addNewPlotTree(false, node)">重命名分组</a-menu-item>
            <a-menu-item @click="onMenuDeleteLayer(node)">删除分组</a-menu-item>
            <a-menu-item @click="onMenuSaveLayerGeojson(node)">导出Geojson</a-menu-item>
            <a-menu-item @click="onMenuSaveLayerKML(node)">导出KML</a-menu-item>
            <a-menu-item>
              <a-upload
                :multiple="false"
                name="file"
                accept="json,geojson"
                :file-list="fileList"
                :showUploadList="false"
                :supportServerRender="true"
                :beforeUpload="() => false"
                @change="(fileInfo) => onMenuOverGeojson(fileInfo, node)"
              >
                导入Geojson
              </a-upload>
            </a-menu-item>
          </a-menu>
          <a-menu v-else>
            <a-menu-item @click="onClickMarkerEditor(node)">编辑标绘</a-menu-item>
            <a-menu-item @click="deletePlotTreeGraphic(node)">删除标绘</a-menu-item>
            <a-menu-item @click="onRightSaveGraphicGeojson(node)">导出Geojson</a-menu-item>
            <a-menu-item @click="onRightSaveGraphicKML(node)">导出KML</a-menu-item>
          </a-menu>
        </template>
      </mars-dropdown-menu>
    </template>
  </mars-tree>
</template>
<script setup lang="ts">
import { onUnmounted, onMounted, ref } from "vue"
import { $message } from "@mars/components/mars-ui"
import type { AntTreeNodeDropEvent } from "ant-design-vue/es/tree"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"

const { activate } = useWidget()

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

const plotTreeData = ref<any[]>([])
const checkedKeys = ref<string[]>([])

onUnmounted(() => {
  mapWork.onUnmoted()
})

onMounted(() => {
  initTree()
})

// 添加矢量数据，
mapWork.eventTarget.on(["addGraphic", "removeGraphic", "addNewPlot", "updataPlotTree"], () => {
  initTree()
})

function initTree() {
  plotTreeData.value = []
  checkedKeys.value = []
  const arrGroup = mapWork.graphicListTree()

  arrGroup.forEach((layer, index) => {
    const graphics = mapWork.getGraphics(layer)
    const isActivate = mapWork.isActivateGraphic(layer)
    const graphicsNum = graphics.filter((item) => !item.isPrivate).length

    let title = layer.name + "(" + graphicsNum + "个)"

    if (isActivate) {
      title += "-激活"
    }
    if (layer.show) {
      plotTreeData.value.push({
        title: title,
        name: layer.name,
        key: layer.id,
        show: layer.show,
        isActivate: isActivate || false,
        children: []
      })
    }

    findChildren(graphics, layer, index)
  })
}

function findChildren(graphics, layer, index) {
  graphics.forEach((graphic: any) => {
    if (!graphic.isPrivate) {
      if (graphic.show) {
        checkedKeys.value.push(graphic.id)
      }
      plotTreeData.value[index].children.push({
        title: graphic.attr.name || graphic.options.name || "未命名-" + graphic.type,
        name: layer.name,
        key: graphic.id,
        id: graphic.id,
        show: graphic.show
      })
    }
  }, null)
}

// ************************icon**************************** //
// 添加一个新的图层 || 给分组重新命名
const addNewPlotTree = (title: boolean, node: any) => {
  activate({
    name: "addPlotTree",
    data: {
      title,
      layerId: title ? "" : node.key,
      inputName: title ? "" : node.name
      // updateListTree: () => mapWork.graphicListTree()
    }
  })
}

// 删所有的空分组
const deleteEmptyLayer = async () => {
  await mapWork.deleteEmptyLayer()
  initTree()
}

// ************************树控件**************************** //
// 定位
const flyTo = (node: any) => {
  mapWork.flyToPlotTreeGraphic(node.id)
}

// 隐藏显示图层
const onPlotTreeCheck = (checkedKeys: any, e: any) => {
  mapWork.showHideGarahic(e.checked, e.node)
}

/*
 * 移动节点至另一个大节点下
 * info.dragNode 被移动的小节点
 * info.dragNodesKeys 被移动的小节点所处大节点的key
 * info.dropPosition 被移动的小节点所处的位置
 * info.node 移动之后被迫更改的节点（上一个节点）
 * info.dropToGap {boolean} 是否拖拽位置在同一个父组件
 *
 **/
const onDrop = (info: AntTreeNodeDropEvent) => {
  const dragNode = info.dragNode
  const dropPos = info.node.pos!.split("-")
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

  // 同级禁止拖拽
  if (info.dropToGap) {
    // console.log("同级", dropPosition)
    // console.log("值", plotTreeData.value.length)
    $message("请拖拽到不同的父级下的首位")
    return
  } else if (info.dropPosition === plotTreeData.value.length) {
    // 位置与数的长度相同，即自立为父组件
    $message("请拖拽到不同的父级下")
    return
  }

  if (info.node.children) {
    mapWork.moveToLayer(String(dragNode.key), String(info.node.key))
    mapWork.graphicListTree()
  }
}

// ************************右键菜单**************************** //
// 矢量数据的右键菜单
// 是否编辑
const onClickMarkerEditor = (node: any) => {
  mapWork.openEditorPannel(node.id)
  mapWork.graphicListTree()
}

// 删除对应矢量数据
const deletePlotTreeGraphic = (node: any) => {
  mapWork.deletePlotTreeGraphic(node.id)
  mapWork.graphicListTree()
}

// 导出geojson
const onRightSaveGraphicGeojson = (node: any) => {
  mapWork.onMenuSaveGraphicGeojson(node.id, node.title)
}

// 导出KML
const onRightSaveGraphicKML = (node: any) => {
  mapWork.onMenuSaveGraphicKML(node.id, node.name)
}

// 矢量图层的右键菜单
const onLayerMenuIsActivate = (node: any) => {
  mapWork.onLayerMenuIsActivate(node.key)
  mapWork.graphicListTree()
}

// 删除图层分组
const onMenuDeleteLayer = (node: any) => {
  mapWork.onMenuDeleteLayer(node.key)
  // initTree()
}

const onMenuSaveLayerGeojson = (node: any) => {
  mapWork.onMenuSaveLayerGeojson(node.key, node.name)
}

const onMenuSaveLayerKML = (node: any) => {
  mapWork.onMenuSaveLayerKML(node.key, node.name)
}

const fileList = ref<FileItem>()
const onMenuOverGeojson = (fileInfo: FileInfo, node: any) => {
  mapWork.onMenuOverGeojson(fileInfo.file, node.key)
  mapWork.graphicListTree()
}
</script>

<style lang="less" scoped>
.data-tree-title {
  padding: 7px 3px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  .title-icon {
    padding: 4px 4px 0 4px;
    border: 1px solid white;
  }
}
</style>
