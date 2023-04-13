<template>
  <mars-dialog title="路线导航" :width="364" :top="60" :right="10">
    <template #icon>
      <mars-icon icon="navigation" width="20" />
    </template>
    <div>
      <div class="f-pt f-mb">
        <a-space>
          <span class="mars-pannel-item-label">起点</span>
          <mars-input v-model:value="startPoint" @change="startPointChange" />
          <mars-button class="small-btn" @click="drawStartPoint">图上选点</mars-button>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">终点</span>
          <mars-input v-model:value="endPoint" @change="endPointChange" />
          <mars-button class="small-btn" @click="drawEndPoint">图上选点</mars-button>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">途径点</span>
          <mars-input class="num-input" readonly v-model:value="passNum" :allowClear="true" />
          <span>个</span>
          <mars-button class="small-btn" @click="drawPassbyPoint">图上选点</mars-button>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">避让区</span>
          <mars-input class="num-input" readonly v-model:value="areaNum" :allowClear="true" />
          <span>个</span>
          <mars-button class="small-btn" @click="drawPassArea">绘制区域</mars-button>
        </a-space>
      </div>

      <div class="f-mt" v-show="pathRoadArr.length > 0">
        <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
          <thead align="center">
            <td :width="35" :height="40">序号</td>
            <td :width="320">推荐线路</td>
          </thead>

          <tbody v-for="(pathRoad, i) in pathRoadArr" :key="i">
            <tr>
              <td rowspan="2">方案 {{ i + 1 }}</td>
              <td height="48">
                <a-space>
                  <mars-button @click="showLine(pathRoad.id)">高亮路线</mars-button>

                  <mars-button @click="startNavigation(pathRoad.id)">{{ pathRoad.id === currentId ? "停止漫游" : "开始漫游" }}</mars-button>

                  <a-checkbox v-show="currentId === pathRoad.id" v-model:checked="isFollow" @change="viewFollow(pathRoad.id)">跟随视角</a-checkbox>
                </a-space>
              </td>
            </tr>
            <tr>
              <td>{{ pathRoad.distance }}</td>
            </tr>
          </tbody>
        </table>

        <div class="speed f-tac">
          <a-space>
            速度：
            <mars-input-number v-model:value="speedVal" @change="resetSpeed" />
            <span>(km/h)</span>
          </a-space>
        </div>
      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { $message } from "@mars/components/mars-ui"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const startPoint = ref("") // 起点坐标
const endPoint = ref("") // 终点坐标
const speedVal = ref(120) // 速度
const isFollow = ref(false) // 视角是否跟随

interface PathRoad {
  id: string
  distance: string
}

const pathRoadArr = ref<PathRoad[]>([]) // 所有路线数组

// 监听到途经点 回传途经点个数到input框
mapWork.eventTarget.on("passPoint", (item: any) => {
  passNum.value = item.passPointNumber
})

// 监听到避让区域 回传途经点个数到input框
mapWork.eventTarget.on("passAreaArr", (item: any) => {
  areaNum.value = item.num
})

// 监听到路径信息
mapWork.eventTarget.on("pathMsg", (item: any) => {
  if (!item?.roadpath) {
    $message("当前无推荐方案")
    return
  }
  const pathArr = item.roadpath
  pathArr.forEach((element: any) => {
    const road = element.pathMsg.road
    const id = element.id
    const distance = "全长" + (element.pathMsg.allDistance / 1000).toFixed(3) + "公里，"
    const content = distance + "途经：" + road.reduce((prev: string[], item: string) => `${prev && item ? prev + "," : prev}${item || ""}`, "")
    pathRoadArr.value.push({ id: id, distance: content })
  })
})

// 绘制起点
const drawStartPoint = async () => {
  clearTableData()
  const position = await mapWork.drawStartPoint()
  startPoint.value = position.lng + "," + position.lat + "," + position.alt
}

// 起点删除
const startPointChange = () => {
  clearTableData()
  if (startPoint.value === "") {
    mapWork.clearStartPoint()
  }
}

// 绘制终点
const drawEndPoint = async () => {
  clearTableData()

  const endPosition = await mapWork.drawEndPoint()
  endPoint.value = endPosition.lng + "," + endPosition.lat + "," + endPosition.alt
}

// 终点删除
const endPointChange = () => {
  clearTableData()
  mapWork.clearEndPoint()
}

// 途经点
const passNum = ref(0)
const drawPassbyPoint = () => {
  clearTableData()
  mapWork.drawPassbyPoint()
}

// 避让区
const areaNum = ref(0)
const drawPassArea = () => {
  clearTableData()
  mapWork.drawPassArea()
}

// 清空表格数据
const clearTableData = () => {
  if (pathRoadArr.value.length > 0) {
    pathRoadArr.value = []
  }
}

// 开始导航
const currentId = ref("")
const startNavigation = (id: string) => {
  const cId = currentId.value
  if (cId) {
    mapWork.reset()
    currentId.value = ""
  }
  if (id && cId !== id) {
    mapWork.startNavigation(id)
    mapWork.resetSpeed(speedVal.value)
    isFollow.value = false
    currentId.value = id
  }
}

// 查看路线
const showLine = (id: string) => {
  if (currentId.value) {
    mapWork.reset()
    currentId.value = ""
  }
  mapWork.openHighlightForLine(id)
}

// 视角跟随
const viewFollow = (id: string) => {
  if (isFollow.value) {
    mapWork.startGS(id)
  } else {
    mapWork.removeTrack()
  }
}

// 速度发生改变
const resetSpeed = () => {
  mapWork.resetSpeed(speedVal.value)
}
</script>
<style lang="less" scoped>
.mars-pannel-item-label {
  width: 40px;
}
.mars-input {
  width: 170px !important;
}
.num-input {
  width: 148px !important;
}
.speed {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
