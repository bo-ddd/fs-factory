<template>
  <mars-dialog title="飞行漫游" width="300" top="60" :right="10">
    <div class="attr-editor-main">
      <roam-route
        ref="editorRoamRoute"
        v-show="activeTab === 'roamline'"
        @editData="editData"
        @roamStart="roamStart"
        @deleteFlyData="deleteFlyData"
        @saveFile="saveFile"
        @importFile="importFile"
      />
      <roam-postions
        ref="editorRoamPostions"
        v-show="activeTab === 'postions'"
        :lonlats="lonlats"
        @pointChange="pointChange"
        @speedChange="speedChange"
      />
      <roam-attribute
        ref="editorRoamAttribute"
        v-show="activeTab === 'style'"
        @attrData="attrData"
        @startPlay="startPlay"
        @delete="clearLine"
        @downloadJson="downloadJson"
      />
    </div>

    <template #icon>
      <mars-icon icon="take-off" width="20"></mars-icon>
    </template>

    <template v-if="isShowEditor" #footer>
      <a-tabs v-model:activeKey="activeTab" centered type="card" tabPosition="bottom">
        <a-tab-pane key="roamline" tab="路线"></a-tab-pane>
        <a-tab-pane key="postions" tab="坐标"></a-tab-pane>
        <a-tab-pane key="style" tab="属性"></a-tab-pane>
      </a-tabs>
    </template>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, markRaw, toRaw } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import RoamRoute from "./roam-route.vue"
import RoamAttribute from "./roam-attribute.vue"
import RoamPostions from "./roam-postions.vue"
import * as mapWork from "./map"
import { readJSON } from "@mars/utils/file-util"
import { $message } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/common/store/widget"
import * as api from "@mars/common/api"

const { activate } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

const editorRoamRoute = ref()
const editorRoamPostions = ref()
const editorRoamAttribute = ref()

const activeTab = ref("roamline")
const lonlats = ref<any[]>([])
const isShowEditor = ref(false)

let flyData: any[] = []

// 读取到历史数据
const initData = async () => {
  flyData = []
  const { code, data } = await api.getHistoricalRecordsList({ type: "mars_roamLine" })

  if (code === 200 && data.length > 0) {
    flyData = data
  }
  const saveData = []

  flyData.forEach((item) => {
    if (item.list) {
      item.list.forEach((e) => {
        saveData.push({ ...e, id: e.id })
      })
    } else {
      saveData.push(item)
    }
  })
  editorRoamRoute.value.setData(saveData)
}

initData()

// 编辑矢量数据触发
let graphic: any
mapWork.eventTarget.on("editStart", async (e: any) => {
  const positions = []
  graphic = e.graphic
  const points = graphic.points
  points.forEach((item) => {
    positions.push([item.lng, item.lat, item.alt])
  })

  lonlats.value = positions

  listenPostions(positions)
})

// 新增路线绘制成功
mapWork.eventTarget.on("hasAddLine", async (e: any) => {
  const newRoamLine = e.graphic.toJSON()
  // 添加
  await api.addHistoricalRecords({
    title: newRoamLine.attr.name,
    type: "mars_roamLine",
    content: JSON.stringify(newRoamLine)
  })
  await initData() // 更新列表

  flyData.forEach((f) => {
    if (f && f.content && JSON.parse(f?.content)?.id === newRoamLine.id) {
      editData(f.id)
    }
  })

  activeTab.value = "style"
})

// 点击编辑
let arrtId: string
function editData(id: string) {
  arrtId = id // 保存一份全局ID
  const data = flyData.find((f) => f.id === id)
  let seletData
  if (data) {
    seletData = JSON.parse(data.content)
  } else {
    flyData.forEach((item) => {
      if (item.list) {
        const edit = item.list.find((d) => d.id === id)
        if (edit) {
          seletData = JSON.parse(edit.content)
        }
      }
    })
  }

  mapWork.startEditingById(seletData)
  editorRoamPostions.value.setPostions(seletData.positions, seletData.attr?.speed)
  editorRoamAttribute.value.setAttr(seletData.attr)
  isShowEditor.value = true
  activeTab.value = "postions"
}

// 接收到改变后的坐标
async function pointChange(points: number[]) {
  lonlats.value = points
  graphic.positions = points
  listenPostions(points)
}

// 监听到矢量数据的坐标发生改变,更新属性
async function listenPostions(positions) {
  graphic.options.positions = positions

  const { code, data } = await api.updateHistoryRecords({
    id: arrtId,
    content: JSON.stringify(graphic.options)
  })
}

// 跳转到漫游路线面板 roamLine
function showRoamflyPannel(lineData: any) {
  const data = getFormatData(lineData)

  if (!data || !data.positions || data?.positions?.length < 2) {
    console.log("漫游路线数据有误！")
    return
  }

  activate({
    name: "roamLine",
    data: markRaw(data)
  })
}

// 转为flyLine需要的参数格式
function getFormatData(lineData: any) {
  let attr: any
  if (lineData.attr) {
    attr = lineData.attr
  } else {
    attr = lineData
  }

  const data: any = {
    id: arrtId,
    name: attr.name,
    remark: attr.remark,
    clockLoop: attr.clockLoop,
    camera: {
      type: attr.cameraType || "gs",
      followedX: attr.followedX,
      followedZ: attr.followedZ,
      offsetZ: attr.offsetZ
    },
    showGroundHeight: attr.showGroundHeight,
    clampToGround: attr.clampToGround,
    interpolation: attr.interpolation, // setInterpolationOptions插值

    positions: lineData.positions,
    speed: attr.speed || 50,
    model: getModelCfg(attr.model)
  }

  if (attr.showLabel) {
    data.label = {
      text: "漫游路线名称"
    }
  }
  if (attr.showLine) {
    data.path = lineData.style
  }
  if (attr.showWall) {
    data.wall = {
      color: "rgba(255,0,0,0.5)"
    }
  }
  if (attr.showConeTrack) {
    data.coneTrack = {
      angle: 15, // 半场角度
      color: "rgba(255,0,255,0.5)"
    }
  }

  return data
}

/**
 * 漫游对象模型
 *
 * @param {string} model 漫游对象模型
 * @return {void}
 */
function getModelCfg(model: string) {
  switch (model) {
    case "model_man": // 行人模型
      return {
        show: true,
        uri: "//data.mars3d.cn/gltf/mars/man/walk.gltf",
        scale: 1,
        minimumPixelSize: 30
      }
    case "model_car": // 汽车模型
      return {
        show: true,
        uri: "//data.mars3d.cn/gltf/mars/qiche.gltf",
        scale: 0.2,
        minimumPixelSize: 50
      }
    case "model_air": // 民航飞机模型
      return {
        show: true,
        uri: "//data.mars3d.cn/gltf/mars/feiji.glb",
        scale: 0.1,
        minimumPixelSize: 50
      }
    case "model_zhanji": // 军用飞机模型
      return {
        show: true,
        uri: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 50
      }
    case "model_weixin": // 卫星模型
      return {
        show: true,
        uri: "//data.mars3d.cn/gltf/mars/weixin.gltf",
        scale: 1,
        minimumPixelSize: 100
      }
    default:
      return { show: false }
  }
}

// 漫游路线面板开始漫游
async function roamStart(id: string) {
  const data = flyData.find((f) => f.id === id)
  let seletData
  if (data) {
    seletData = JSON.parse(data.content)
  } else {
    flyData.forEach((item) => {
      if (item.list) {
        const edit = item.list.find((d) => d.id === id)
        if (edit) {
          seletData = JSON.parse(edit.content)
        }
      }
    })
  }

  if (seletData) {
    if (speed) {
      seletData.attr.speed = speed
      // 数据更新
      const { code, data } = await api.updateHistoryRecords({
        id: id,
        content: JSON.stringify(seletData)
      })

      if (code === 200 && data) {
        await initData()
      }
    }

    showRoamflyPannel(seletData)
  }
}

// 删除漫游路线
async function deleteFlyData(id: string) {
  const deleteData = flyData.find((f) => f.id === id)
  if (deleteData) {
    const seletData = JSON.parse(deleteData.content)
    mapWork.deleteRoam(seletData.id)
    const { code, data } = await api.deleteHistoricalRecordsById(id)

    if (code === 200 && data) {
      await initData()
    }
  } else {
    flyData.forEach((item) => {
      if (item.list) {
        const findData = item.list.find((f) => f.id === id)
        deleteInfoFly(findData, item)
        if (findData) {
          mapWork.deleteRoam(JSON.parse(findData.content).id)
        }
      }
    })
  }
}

// 文件导入 漫游路线删除特殊处理
const deleteInfoFly = async (infoData, info) => {
  const arrNew = info.list.filter((item) => item.id !== infoData.id)
  const { code, data } = await api.updateHistoryRecords({
    id: info.id,
    list: arrNew
  })
  if (code === 200) {
    initData()
  }
}

let id: string // 绘制完成后，默认数据
let options: any // 矢量数据options字段
// 属性面板开始漫游
async function attrData(attr: any) {
  if (attr) {
    const selectData = flyData.find((f) => f.id === arrtId)
    id = selectData?.id
    options = graphic.options
    options.attr = toRaw(attr)
  }
}

// 开始漫游
async function startPlay() {
  if (options) {
    if (speed) {
      options.attr.speed = speed
    }
    // 数据更新
    const { code, data } = await api.updateHistoryRecords({
      id: id,
      content: JSON.stringify(options)
    })

    if (code === 200 && data) {
      await initData()
    }

    showRoamflyPannel(options)
  }
}

let speed: any
// 速度发生改变
function speedChange(item: any) {
  speed = toRaw(item)
}

// 清除漫游路线
function clearLine() {
  deleteFlyData(arrtId)
  isShowEditor.value = false
  activeTab.value = "roamline"
}

// 保存文件
function saveFile() {
  mapWork.saveFile(flyData)
}

// 导入文件
async function importFile(info: any) {
  const dataArr = await readJSON<any[]>(info.file)
  if (Array.isArray(dataArr)) {
    // dataArr.forEach((e) => {
    //   if (e.type !== "mars_roamLine") {
    //     $message("数据格式有误，只能导入从“导出”按钮保存的数据")
    //   }
    // })
    const { code, message } = await api.addHistoricalList(
      dataArr.map((item) => {
        return {
          id: item.id,
          title: item.title,
          type: "mars_roamLine",
          content: item.content
        }
      })
    )

    if (code === 200) {
      initData()
    } else {
      $message(message)
    }
  } else {
    $message("数据格式有误，只能导入从“导出”按钮保存的数据")
  }
}

// 下载JSON
function downloadJson() {
  const data = flyData.find((f) => f.id === arrtId)
  let jsonData
  if (data) {
    jsonData = getFormatData(JSON.parse(data.content))
  } else {
    flyData.forEach((item) => {
      if (item.list) {
        const edit = item.list.find((d) => d.id === arrtId)
        if (edit) {
          jsonData = getFormatData(JSON.parse(edit.content))
        }
      }
    })
  }
  mapWork.downloadJson(jsonData)
}
</script>

<style scoped lang="less">
.attr-editor-main {
  height: calc(100% +120px);
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
:deep(.ant-tabs-tab) {
  color: var(--mars-text-color);
}
</style>
