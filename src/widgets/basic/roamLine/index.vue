<template>
  <mars-dialog v-bind="attrs" title="漫游路线" handles="y" width="260" top="224" :right="10">
    <div class="f-mb f-tac f-pt">
      <a-space>
        <mars-button :disabled="btnDisabled" @click="onClickStop">
          <template #icon>
            <mars-icon icon="pause-one" width="20"></mars-icon>
          </template>
          停止漫游
        </mars-button>

        <mars-button :disabled="btnDisabled" @click="showHeightChars">
          <template #icon>
            <mars-icon icon="chart-line" width="20"></mars-icon>
          </template>

          查看剖面图</mars-button
        >
      </a-space>
    </div>

    <template #icon>
      <mars-icon icon="take-off" width="20"></mars-icon>
    </template>

    <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
      <tr>
        <td>路线名称</td>
        <td>{{ formState.name }}</td>
      </tr>
      <tr>
        <td>视角模式</td>
        <td>
          <mars-select v-model:value="formState.cameraType" :options="perspectiveMode" @select="viewChane"></mars-select>
        </td>
      </tr>

      <tr v-show="distanceIsShow">
        <td>视角距离</td>
        <td>
          <mars-input-number :min="0" :max="99999" v-model:value="formState.followedX" :step="0.1" @change="updateCameraSetting"></mars-input-number>
        </td>
      </tr>

      <tr v-show="isShow">
        <td>视角高度</td>
        <td>
          <mars-input-number :min="0" :max="99999" v-model:value="formState.followedZ" :step="0.1" @change="updateCameraSetting"></mars-input-number>
        </td>
      </tr>

      <tr v-show="otherIsShow">
        <td>高度偏移值</td>
        <td>
          <mars-input-number :min="0" :max="99999" v-model:value="formState.offsetZ" :step="0.1" @change="updateCameraSetting"></mars-input-number>
        </td>
      </tr>

      <tr v-show="otherIsShow">
        <td>横向偏移值</td>
        <td>
          <mars-input-number :min="0" :max="99999" v-model:value="formState.offsetX" :step="0.1" @change="updateCameraSetting"></mars-input-number>
        </td>
      </tr>

      <tr v-show="otherIsShow">
        <td>前后偏移值</td>
        <td>
          <mars-input-number :min="0" :max="99999" v-model:value="formState.offsetY" :step="0.1" @change="updateCameraSetting"></mars-input-number>
        </td>
      </tr>

      <tr>
        <td>总长度</td>
        <td>{{ formState.td_alllength }}</td>
      </tr>

      <tr>
        <td>已漫游长度</td>
        <td>{{ formState.td_length }}</td>
      </tr>

      <tr>
        <td>总时长</td>
        <td>{{ formState.td_alltimes }}</td>
      </tr>

      <tr>
        <td>已漫游时间</td>
        <td>{{ formState.td_times }}</td>
      </tr>

      <tr>
        <td>经度</td>
        <td>{{ formState.td_jd }}</td>
      </tr>

      <tr>
        <td>纬度</td>
        <td>{{ formState.td_wd }}</td>
      </tr>

      <tr>
        <td>漫游高程</td>
        <td>{{ formState.td_gd }}</td>
      </tr>
    </table>
    <div class="f-tac f-pt">
      <a-progress :percent="formState.percent" size="small" />
    </div>
  </mars-dialog>

  <mars-dialog :draggable="false" v-model:visible="isShowCharts" :before-close="closeEchats" closeable width="calc(100% - 20px)" top="60" left="10">
    <div class="ech">
      <div id="echarts-view" class="echartsView"></div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, UnwrapRef, ref, useAttrs, onUnmounted } from "vue"
import * as mapWork from "../roamLine/map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as echarts from "echarts"
import { useWidget } from "@mars/common/store/widget"

const { activate, currentWidget } = useWidget()
// 启用map.ts生命周期
useLifecycle(mapWork)

const attrs = useAttrs()

// const { roamLineData } = useWidget()

interface FormState {
  cameraType: string
  name: string
  td_alllength: number
  td_length: number
  td_alltimes: number
  td_times: number
  td_jd: number
  td_wd: number
  td_gd: number
  td_dmhb: number
  td_ldgd: number
  percent: number
  followedX: number
  followedZ: number
  offsetZ: number
  offsetX: number
  offsetY: number
}

const formState: UnwrapRef<FormState> = reactive({
  cameraType: "",
  name: "",
  td_alllength: 0,
  td_length: 0,
  td_alltimes: 0,
  td_times: 0,
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  td_dmhb: 0,
  td_ldgd: 0,
  percent: 0,
  followedX: 50,
  followedZ: 10,
  offsetZ: 0,
  offsetX: 0,
  offsetY: 0
})

const isShow = ref(false) // 视角距离显示
const otherIsShow = ref(false)
const isShowCharts = ref(false)
const btnDisabled = ref(true)
const perspectiveMode = [
  {
    value: "",
    label: "无"
  },
  {
    value: "gs",
    label: "跟随视角"
  },
  {
    value: "dy",
    label: "锁定第一视角"
  },
  {
    value: "sd",
    label: "锁定上帝视角"
  }
]

onMounted(() => {
  mapWork.getRoamLineData(currentWidget.data)
})

onUnmounted(() => {
  window.removeEventListener("onresize", winEvent)
  if (myChart) {
    myChart.dispose()
  }
})
let winEvent: any
// 基础数据
mapWork.eventTarget.on("baseInfoLoaded", (event: any) => {
  formState.cameraType = event.cameraType
  formState.name = event.name
  formState.td_alllength = event.alllen
  formState.td_alltimes = event.alltime
  btnDisabled.value = false
  formState.followedX = event.followedX
  formState.followedZ = event.followedZ
  formState.offsetZ = event.offsetZ

  updateCameraSetting()
})

// 剖面图数据
let myChart: echarts.ECharts
let echartData: any

// 数据更新
mapWork.eventTarget.on("update", (event: any) => {
  roamLineChange(event)
  if (isShowCharts.value) {
    updateFlyOk(event.distance)
  }
})

// 变化的数据
function roamLineChange(roamLineData: any) {
  formState.td_length = roamLineData.distance_str
  formState.td_times = roamLineData.second_str
  formState.td_jd = roamLineData.point?.lng
  formState.td_wd = roamLineData.point?.lat
  formState.td_gd = roamLineData.alt_str
  formState.percent = roamLineData.percent
}

function updateFlyOk(len: number) {
  if (!echartData || isNaN(len)) {
    return
  }
  const arrFlyOk = [] // 已漫游
  for (let i = 0; i < echartData.arrFxgd.length; i++) {
    if (echartData.arrLength[i] <= len) {
      arrFlyOk.push(echartData.arrFxgd[i])
    } else {
      break
    }
  }

  // 填入数据,根据名字对应到相应的系列
  myChart.setOption({
    series: [{ name: "已漫游", data: arrFlyOk, zlevel: 100, areaStyle: "color: rab(235, 204, 88)" }]
  })
}

// 视角发生改变
const distanceIsShow = ref(true)
const viewChane = (value: string) => {
  updateCameraSetting()
  if (value === "") {
    distanceIsShow.value = false
    isShow.value = false
    otherIsShow.value = false
  }

  if (value === "sd") {
    distanceIsShow.value = false
    isShow.value = true
    otherIsShow.value = false
  }
  if (value === "gs") {
    distanceIsShow.value = true
    isShow.value = false
    otherIsShow.value = false
  }

  if (value === "dy") {
    otherIsShow.value = true
  }
}

// 改变视角模式
function updateCameraSetting() {
  mapWork.setCameraOptions({
    type: formState.cameraType,
    radius: formState.cameraType === "gs" ? formState.followedX : 0,
    followedX: formState.followedX,
    followedZ: formState.followedZ,
    offsetZ: formState.offsetZ,
    offsetY: formState.offsetY,
    offsetX: formState.offsetX
  })
}

// 停止漫游
const onClickStop = () => {
  activate("roamLine-list")
  mapWork.stopRoamLine()
  isShowCharts.value = false
}

// ===============echarts图表部分======================

// 飞行漫游 图表
function setEchartsData() {
  if (echartData == null || myChart == null) {
    return
  }

  const option: any = {
    animation: false,
    legend: {
      data: ["地面海拔", "漫游海拔", "已漫游"]
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
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
      // position: function (point, params, dom, rect, size) {
      //    return [10, 20];
      // },
      formatter: function (params: any) {
        let inhtml = ""
        if (params.length < 2) {
          return inhtml
        }

        const hbgd = params[0].value // 海拔高度
        const fxgd = params[1].value // 漫游海拔

        const point = echartData.arrPoint[params[0].dataIndex] // 所在经纬度

        inhtml +=
          "所在位置&nbsp;" +
          point.lng +
          "," +
          point.lat +
          "<br />" +
          params[1].seriesName +
          "&nbsp;<label style='color:" +
          params[1].color +
          ";'>" +
          params[1].value +
          "</label>&nbsp;米<br />"

        if (hbgd !== 0) {
          inhtml += params[0].seriesName + "&nbsp;<label style='color:" + params[0].color + ";'>" + params[0].value + "</label>&nbsp;米<br />"
          const ldgd = fxgd - hbgd // 离地高度
          inhtml += "距离地面&nbsp;<label style='color:" + params[1].color + ";'>" + ldgd.toFixed(1) + "</label>&nbsp;米"
          // if (charsData.arrBjgd) {
          //     var bjgd = charsData.arrBjgd[params[0].dataIndex];
          //     if (bjgd > fxgd)
          //         inhtml += "(低于报警<label style='color:red;'>&nbsp;" + (bjgd - ldgd).toFixed(1) + "</label>&nbsp;米)";
          // }
        }

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
        axisLabel: {
          show: false
        },
        data: echartData.arrLength
      }
    ],
    yAxis: [
      {
        // name: '高度',
        type: "value",
        axisLabel: {
          fontSize: "10",
          formatter: "{value} 米"
        }
      }
    ],
    series: [
      {
        name: "地面海拔",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          normal: {
            color: "rgb(255, 70, 131)"
          }
        },
        areaStyle: {
          normal: {
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
          }
        },
        data: echartData.arrHbgd
      },
      {
        name: "漫游海拔",
        type: "line",
        smooth: false,
        symbol: "none",
        data: echartData.arrFxgd
      },
      {
        name: "已漫游",
        type: "line",
        data: []
      }
    ]
  }

  winEvent = window.onresize = () => {
    myChart.resize()
  }
  myChart.setOption(option)
  myChart.resize()
}

// 显示剖面图
const showHeightChars = async () => {
  isShowCharts.value = true
  const data = await mapWork.getTerrainHeight()
  echartData = data
  myChart = echarts.init(document.getElementById("echarts-view")!, "dark")
  setEchartsData()
}

// 关闭剖面图
const closeEchats = () => {
  if (myChart) {
    myChart.clear()
  }
}
</script>
<style scoped lang="less">
.ant-select,
.ant-input-number {
  width: 120px;
  height: 30px;
}

.ech {
  height: 200px;
  width: 100%;
}
.ech .echartsView {
  width: 100%;
  height: 100%;
}

.ant-progress {
  width: 98%;
}
:deep(.ant-progress-text) {
  color: #fff !important;
}
</style>
