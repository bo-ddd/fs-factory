<template>
  <mars-dialog title="属性编辑" width="260" top="60" bottom="40" left="10" :minWidth="200">
    <div class="top-handle-bar">
      <a-space>
        <mars-icon icon="send" width="20" @click="flyToGraphic" title="飞行定位"></mars-icon>
        <mars-icon icon="delete" width="20" @click="deleteEntity" title="删除"></mars-icon>
        <mars-icon icon="save" width="20" @click="getGeoJson" title="导出geojson"></mars-icon>
      </a-space>
    </div>
    <div class="attr-editor-main">
      <mars-attrs v-if="activeTab === 'attr'" :attrs="attrs" @attrChange="attrChange" />
      <mars-positions
        v-if="activeTab === 'coord'"
        :lonlats="lonlats"
        :minNum="minNum"
        :maxNum="maxNum"
        @pointChange="pointChange"
        @addRemovePoint="addRemovePoint"
      />
      <mars-styles
        v-if="activeTab === 'style'"
        :style="style"
        :layerName="layerName"
        :customType="customType"
        :graphicType="graphicType"
        @styleChange="styleChange"
      />
    </div>
    <template #footer>
      <a-tabs v-model:activeKey="activeTab" centered type="card" tabPosition="bottom" @change="tabChange">
        <a-tab-pane key="attr" tab="属性"></a-tab-pane>
        <a-tab-pane key="coord" tab="坐标"></a-tab-pane>
        <a-tab-pane key="style" tab="样式"></a-tab-pane>
      </a-tabs>
    </template>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue"
import _ from "lodash"
import MarsStyles from "./mars-styles.vue"
import MarsPositions from "./mars-positions.vue"
import MarsAttrs from "./mars-attrs.vue"
import * as mapWork from "./map"
import localforage from "localforage"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { useWidget } from "@mars/common/store/widget"

const { currentWidget, updateWidget } = useWidget()

const style = ref(null)
const layerName = ref("")
const customType = ref("")
const graphicType = ref("")

const lonlats = ref(null)
const minNum = ref(null)
const maxNum = ref(null)

const attrs = ref(null)

const activeTab = ref("style") // 卡片所处位置
let graphic // 矢量数据

// 启用map.ts生命周期
useLifecycle(mapWork)

const tabChange = (item: any) => {
  localforage.setItem("active-tab", item)
}

onMounted(() => {
  graphic = currentWidget.data.graphic
  updataLayer()

  minNum.value = getMinPointNum(graphic)
  maxNum.value = getMaxPointNum(graphic)
})

// 监听改变坐标位置
currentWidget.onUpdate((e) => {
  graphic = e.data?.graphic
  updataLayer()
})

// 监听到矢量数据发生变化
function updataLayer() {
  if (!graphic) {
    return
  }
  layerName.value = graphic._layer.name || ""
  graphicType.value = graphic.type
  customType.value = currentWidget.data.styleType || graphic.options.styleType

  // console.log("开始编辑style样式", graphic)
  style.value = _.cloneDeep(graphic.style)
  lonlats.value = _.cloneDeep(graphic.coordinates)
  attrs.value = _.cloneDeep(graphic.attr)
}

// 样式修改
function styleChange(style: any) {
  style = toRaw(style)
  // console.log("修改了style样式", style)
  graphic.setStyle(style)
}

// 坐标修改
function pointChange(points: any[]) {
  // console.log("修改了positions坐标", points)
  points = toRaw(points)

  graphic.positions = points
}
function addRemovePoint(points: any[]) {
  // console.log("修改了positions坐标", points)
  points = toRaw(points)

  graphic.positions = points
  lonlats.value = points
}
function getMinPointNum(gp: any): number {
  if (gp && gp._minPointNum) {
    return gp._minPointNum
  }
  return 3
}
function getMaxPointNum(gp: any): number {
  if (gp && gp._maxPointNum) {
    return gp._maxPointNum
  }
  return 999
}

// 属性修改
function attrChange(item: any) {
  // console.log("修改了attr属性", item) // 方便测试

  graphic.attr[item.name] = toRaw(item.value) // 取单个

  setTimeout(() => {
    updateWidget("plot")
  }, 500)
}

// *********************  删除定位保存文件方法  ******************* //
function getGeoJson() {
  const geojson = graphic.toGeoJSON() // 文件处理
  geojson.properties._layer = graphic._layer.name

  mapWork.downloadFile("标绘item.json", JSON.stringify(geojson))
}

function flyToGraphic() {
  graphic.flyTo() // 事件处理
}

function deleteEntity() {
  graphic.remove() // 删除
}
</script>
<style lang="less" scoped>
.top-handle-bar {
  border-bottom: 1px solid #cde1de;
  padding: 5px 0 2px 0;
  :deep(.mars-icon) {
    cursor: pointer;
  }
}
.attr-editor-main {
  height: calc(100% - 40px);
  overflow-y: auto;
  :deep(*) {
    font-size: 12px;
  }
}
:deep(.ant-tabs-nav) {
  margin: 0;
}
:deep(.ant-select),
:deep(.ant-input-number) {
  width: 100%;
}
</style>
