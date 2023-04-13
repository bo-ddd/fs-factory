<template>
  <mars-dialog title="图上量算" width="325" top="60" :right="10" :min-width="297" v-bind="attrs">
    <template #icon>
      <mars-icon icon="ruler" width="18"></mars-icon>
    </template>

    <div class="measure" title="提示：单击按钮激活对应功能,在地图上单击开始，绘制中单击增加点、双击结束。">
      <div class="tool" v-for="(item, index) in htmlDataArr" :key="index" @click="selectTool(item)">
        <div class="tool-thum" :style="item.style">
          <img class="tool-thum_img" :src="item.img" />
        </div>
        <span> {{ item.name }} </span>
      </div>
    </div>

    <div class="f-tac f-mb">
      <a-checkbox v-model:checked="enabledOnlyModel" @change="onChangeOnlyModel">仅测量模型(不拾取地形)</a-checkbox>
    </div>

    <div class="f-tac f-mb" v-show="!showAreaUnit">
      <a-space>
        <span>单位</span>
        <mars-select class="measure-unit-select" v-model:value="selectUnitDistance" :options="selectDistanceOptions"> </mars-select>
      </a-space>
    </div>
    <div class="f-tac f-mb" v-show="showAreaUnit">
      <a-space>
        <span>单位</span>
        <mars-select class="measure-unit-select" v-model:value="selectUnitArea" :options="selectAreaOptions"> </mars-select>
      </a-space>
    </div>

    <div class="f-tac f-mb measure-data" v-show="showMeasureData">{{ measureData }}</div>
    <div class="f-tac measure-clear">
      <mars-button type="primary" block @click="clearMeasure"> 清空测量数据 </mars-button>
    </div>
  </mars-dialog>
  <mars-dialog :draggable="false" v-model:visible="isShowEchart" width="calc(100% - 95px)" left="56" bottom="40" height="200" closeable>
    <div id="echartsView1" class="echartMeasure"></div>
  </mars-dialog>
</template>

<script setup lang="ts">
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { nextTick, onUnmounted, ref, useAttrs } from "vue"
import * as echarts from "echarts"
import * as mapWork from "./map"
import { $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
import mlImage1 from "./image/measure-length.svg"
import mlImage2 from "./image/measure-length2.svg"
import mlImage3 from "./image/measure-section.svg"
import mlImage4 from "./image/measure-area.svg"
import mlImage6 from "./image/measure-angle.svg"
import mlImage7 from "./image/measure-height-sup.svg"
import mlImage8 from "./image/measure-coor.svg"
import mlImage9 from "./image/measure-height.svg"

const attrs = useAttrs()

// 启用map.ts生命周期
useLifecycle(mapWork)

const htmlDataArr = [
  {
    name: "空间距离",
    img: mlImage1,
    key: "MeasureDistance",
    useUnit: true,
    showAreaUnit: false,
    style: "background: #dd751b"
  },
  {
    name: "贴地距离",
    img: mlImage2,
    key: "MeasureDistanceSurface",
    useUnit: true,
    showAreaUnit: false,
    style: "background: #c092fe"
  },
  {
    name: "剖面",
    img: mlImage3,
    key: "MeasureSection",
    useUnit: true,
    showAreaUnit: false,
    style: "background: #88b8ff"
  },
  {
    name: "水平面积",
    img: mlImage4,
    key: "MeasureArea",
    useUnit: true,
    showAreaUnit: true,
    style: "background: #3de3f4"
  },
  {
    name: "贴地面积",
    img: mlImage4,
    key: "MeasureAreaSurface",
    showAreaUnit: true,
    useUnit: true,
    style: "background: #c092fe"
  },
  {
    name: "角度",
    img: mlImage6,
    key: "MeasureAngle",
    useUnit: false,
    style: "background: #95d333"
  },
  {
    name: "三角测量",
    img: mlImage7,
    key: "MeasureHeightTriangle",
    useUnit: true,
    showAreaUnit: false,
    style: "background: #37bc41"
  },
  {
    name: "坐标测量",
    img: mlImage8,
    key: "MeasurePoint",
    useUnit: false,
    style: "background: #babc31"
  },
  {
    name: "高度差",
    img: mlImage9,
    key: "MeasureHeight",
    useUnit: true,
    showAreaUnit: false,
    style: "background: #55d5a0"
  }
]

const activeTool = ref("")
const selectTool = (tool: any) => {
  activeTool.value = tool.name

  if (tool.showAreaUnit) {
    showAreaUnit.value = tool.showAreaUnit
  }

  const func = mapWork[`onClick${tool.key}`]
  if (tool.useUnit) {
    if (showAreaUnit.value) {
      func(selectUnitArea.value)
    } else {
      func(selectUnitDistance.value)
    }
  } else {
    func()
  }
}

// 测量数据
const measureData = ref()
// 显示测量的数据
const showMeasureData = ref(false)
// 显示单位，距离和面积拥有不同的单位
const showAreaUnit = ref(false)
// 显示图表
const isShowEchart = ref(false)

mapWork.eventTarget.on("editorMeasureData", onMeasureData)
function onMeasureData(e: { label: string }) {
  // 隐藏剖面的图表
  isShowEchart.value = false

  // 显示量算的数据
  if (!e.label) {
    return
  }

  showMeasureData.value = true
  measureData.value = e.label
}

let myChart1: any
mapWork.eventTarget.on("echartDataLoad", onEchartData)
function onEchartData(e: any) {
  $showLoading()
  let dom: HTMLElement
  if (!dom) {
    dom = document.getElementById("echartsView1")
    myChart1 = echarts.init(dom, "dark")
  }
  if (dom) {
    setEchartsData(e)
  }
}

// 图表自适应
window.addEventListener("resize", resize)
function resize() {
  if (myChart1) {
    myChart1.resize()
  }
}

// 仅测量模型
const enabledOnlyModel = ref(false)
const onChangeOnlyModel = () => {
  mapWork.onChangeOnlyModel(enabledOnlyModel.value)
}

// 清空测量数据
const clearMeasure = () => {
  // 隐藏量算的数据
  showMeasureData.value = false
  // 隐藏剖面的图表
  isShowEchart.value = false
  mapWork.clearMeasure()
}

// ********************************下拉菜单**************************/
// 测量距离的下拉菜单
const selectUnitDistance = ref("auto")
const selectDistanceOptions = [
  {
    value: "auto",
    label: "自动"
  },
  {
    value: "mi",
    label: "米"
  },
  {
    value: "km",
    label: "公里"
  },
  {
    value: "mile",
    label: "海里"
  },
  {
    value: "zhang",
    label: "丈"
  }
]

// 测量面积的下拉菜单
const selectUnitArea = ref("auto")
const selectAreaOptions = [
  {
    value: "auto",
    label: "自动"
  },
  {
    value: "mi",
    label: "平方米"
  },
  {
    value: "km",
    label: "平方公里"
  },
  {
    value: "mu",
    label: "亩"
  },
  {
    value: "ha",
    label: "公顷"
  }
]

onUnmounted(() => {
  window.removeEventListener("resize", resize)

  if (myChart1) {
    myChart1.dispose()
  }
})

// 剖面分析 图表
function setEchartsData(data: any) {
  const arrPoint = data.arrPoint

  const option = {
    grid: {
      left: 10,
      right: 10,
      top: 15,
      bottom: 0,
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50
      }
    ],
    tooltip: {
      trigger: "axis",
      position: (pos: any, params: any, dom: any, rect: any, size: any) => {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        const obj: any = { top: 5 }
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5
        return obj
      },
      formatter: function (params: any) {
        let inhtml = ""
        if (params.length === 0) {
          mapWork.hideTipMarker()
          return inhtml
        }

        const hbgd = params[0].value // 海拔高度
        const point = arrPoint[params[0].dataIndex] // 所在经纬度
        const len = formatLength(Number(params[0].axisValue), null)
        const hbgdStr = formatLength(Number(params[0].value), null)

        inhtml = `当前位置<br />
                    距起点：${len}<br />
                    海拔：<span style='color:${params[0].color};'>${hbgdStr}</span><br />
                    经度：${point.lng}<br />
                    纬度：${point.lat}`

        mapWork.showTipMarker(point, hbgd, inhtml)

        return inhtml
      }
    },
    xAxis: [
      {
        name: "行程",
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: false
        },
        show: false,
        data: data.arrLen
      }
    ],
    yAxis: [
      {
        type: "value",
        min: getMinZ(arrPoint),
        formatter: "{value} 米"
      }
    ],
    series: [
      {
        name: "高程值",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        color: "rgb(255, 70, 131)",
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)"
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)"
            }
          ])
        },
        data: data.arrHB
      }
    ]
  }

  isShowEchart.value = true
  myChart1.setOption(option)
  nextTick(() => {
    myChart1.resize()
  })

  $hideLoading()
}

function getMinZ(arr: any) {
  let minz = "dataMin"
  if (arr == null || arr.length === 0) {
    return minz
  }

  minz = arr[0].alt
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].alt < minz) {
      minz = arr[i].alt
    }
  }
  return minz
}

/**  单位换算，格式化显示长度     */
function formatLength(val: number, unit: any) {
  if (val == null) {
    return ""
  }
  val = Number(val)

  if (unit === null || unit === "auto") {
    if (val < 1000) {
      unit = "m"
    } else {
      unit = "km"
    }
  }

  let valstr = ""
  switch (unit) {
    case "km":
      valstr = (val * 0.001).toFixed(2) + "公里"
      break
    case "mile":
      valstr = (val * 0.00054).toFixed(2) + "海里"
      break
    case "zhang":
      valstr = (val * 0.3).toFixed(2) + "丈"
      break
    case "m":
    default:
      valstr = val.toFixed(2) + "米"
      break
  }
  return valstr
}
</script>
<style lang="less" scope>
.measure {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-left: 20px;
}
.measure-unit-select {
  width: 165px;
  text-align: left;
}
.tool {
  cursor: pointer;
  user-select: none;
  height: 96px;
  box-sizing: border-box;
  margin: 0 30px 10px 0;
  text-align: center;
  padding-top: 12px;
  .tool-thum {
    transition: all 0.2s ease;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 10px;
    background: #fd960f;
    .tool-thum_img {
      width: 24px;
      height: 24px;
      margin: 13px;
    }
  }
}

.measure-data {
  font-size: 15px;
}
.measure-clear {
  :deep(.mars-button) {
    width: 200px;
  }
}

.echartMeasure {
  width: 100%;
  height: 100%;
}
</style>
