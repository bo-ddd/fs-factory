<template>
  <mars-dialog title="我的标记" :max-width="800" width="326" top="60" right="10">
    <template #icon>
      <mars-icon icon="mark" width="18"></mars-icon>
    </template>

    <div class="marker-list f-pt">
      <ul class="marker-list-ul">
        <li class="f-mr marker-list-li_icon" title="添加注记" @click="onClickMarkerAdd">
          <mars-icon icon="edit-two" width="18"></mars-icon>
        </li>
        <li class="f-mr">|</li>
        <li class="f-mr marker-list-li_icon" title="打开文件">
          <a-upload
            :multiple="false"
            name="file"
            accept="json,geojson"
            :file-list="fileList"
            :showUploadList="false"
            :supportServerRender="true"
            :beforeUpload="() => false"
            @change="onClickMarkerOpenfile"
          >
            <mars-icon icon="folder-open" width="18"></mars-icon>
          </a-upload>
        </li>

        <li class="f-mr marker-list-li_icon" title="叠加文件">
          <a-upload
            :multiple="false"
            name="file"
            accept="json,geojson"
            :file-list="fileList"
            :showUploadList="false"
            :supportServerRender="true"
            :beforeUpload="() => false"
            @change="onClickMarkerOverfile"
          >
            <mars-icon icon="seo-folder" width="18"></mars-icon>
          </a-upload>
        </li>
        <li class="f-mr marker-list-li_icon" title="保存文件" @click="onClickMarkerSavefile">
          <mars-icon icon="save-one" width="18"></mars-icon>
        </li>
        <li class="f-mr">|</li>
        <li class="f-mr marker-list-li_icon" title="清空标记" @click="onClickMarkerDeleteAll">
          <mars-icon icon="delete" width="18"></mars-icon>
        </li>
        <li class="f-mr marker-list-li_icon" title="是否可编辑" @click="onClickMarkerEditor">
          <mars-icon v-show="lockEditor" icon="unlock" width="18"></mars-icon>
          <mars-icon v-show="!lockEditor" icon="lock" width="18"></mars-icon>
        </li>
      </ul>
    </div>

    <div class="marker-table">
      <mars-table :pagination="true" :dataSource="dataSource" :columns="columns" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-space>
              <mars-icon icon="move-one" color="#4983e2" @click="flyTo(record)" />
              <mars-icon v-show="lockEditor" icon="delete" color="#4983e2" @click="deleted(record)"></mars-icon>
            </a-space>
          </template>
          <template v-else>
            {{ record.name }}
          </template>
        </template>
      </mars-table>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { saveJSON, readJSON } from "@mars/utils/file-util"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as api from "@mars/common/api"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

// 加载历史数据
const getHistoryList = async (isClear = true) => {
  const { data, code } = await api.getMarkerPointHistoryList()

  dataSource.value = []
  if (code === 200) {
    dataSource.value = mapWork.loadJson(data, isClear) || []
  }
}
getHistoryList()

// 添加注记
const onClickMarkerAdd = async () => {
  mapWork.stopGraphicDraw()
  const mark = await mapWork.onClickMarkerAdd()

  const { data, code } = await api.addMarkerPointHistory(mark)

  if (code === 200) {
    dataSource.value.push(mark)
  } else {
    console.log("添加失败", data)
  }
}
// popup中点击事件，更新名称以及历史记录
mapWork.eventTarget.on("clickPopupBtn", (e) => {
  const tableOneData = dataSource.value.find((value) => value.key === e.key)
  if (tableOneData) {
    tableOneData.name = e.name
    tableOneData.key = e.key
  }

  updateChangeGraphic({ ...tableOneData, remark: e.remark, type: "point", point: e.point })
})

mapWork.eventTarget.on("removeMarker", (e) => {
  const data = dataSource.value.find((value) => value.id === e.options.id)

  data && deleteGraphicById(data.id, data.key)
})

// 清除
const onClickMarkerDeleteAll = async () => {
  const { code } = await api.deleteAll()
  if (code === 200) {
    mapWork.onClickMarkerDeleteAll()
    dataSource.value = []
  }
}

// 是否编辑
const lockEditor = ref(true)
const onClickMarkerEditor = () => {
  mapWork.stopGraphicDraw()
  lockEditor.value = !lockEditor.value

  mapWork.onClickMarkerEditor(lockEditor.value)
}

// *****************************************文件******************************************** //
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

let fileList: FileItem

// 保存文件
const onClickMarkerSavefile = () => {
  mapWork.stopGraphicDraw()

  saveJSON(mapWork.getJsonData())
}

// 打开文件
const onClickMarkerOpenfile = async (info: FileInfo) => {
  mapWork.stopGraphicDraw()
  const getData = await readJSON<any[]>(info.file)

  const { code } = await api.deleteAll()
  if (code === 200) {
    mapWork.onClickMarkerDeleteAll()
    await api.addMarkerPointcalList(getData)
    getHistoryList()
  }
}

// 叠加文件
const onClickMarkerOverfile = async (info: FileInfo) => {
  mapWork.stopGraphicDraw()
  const data = await readJSON<any[]>(info.file)

  if (data.length) {
    console.log("打开的文件", data)
    await api.addMarkerPointcalList(data)
    getHistoryList(false)
  }
}

// *****************************************表格******************************************** //
interface DataTable {
  id?: string
  key: string | number
  name: string
}

const dataSource = ref<DataTable[]>([])

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    id: "name",
    showSorterTooltip: false,
    width: 100,
    align: "center",
    sorter: (a: DataTable, b: DataTable) => (a.name > b.name ? -1 : 1)
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    id: "name",
    align: "center",
    width: 60
  }
]

// 删除对应id的矢量数据
const deleted = (record: DataTable) => {
  deleteGraphicById(record.id, record.key)
}

// 点击表格定位至对应id的矢量数据
const flyTo = (record: DataTable) => {
  mapWork.flyTo(record.key)
}

// 修改数据的名字
const updateChangeGraphic = async (historyData: any) => {
  historyData = await api.updateMarkerPointHistory(historyData)
  if (!historyData) {
    return
  }

  if (historyData.code === 200) {
    console.log("修改成功", historyData.data)
  } else {
    console.log("修改失败", historyData.data)
  }
}

// 删除对应id的记录和数据
const deleteGraphicById = async (id: string, key: string | number) => {
  const { code } = await api.deleteMarkerPointHistoryById(id)

  if (code === 200) {
    dataSource.value = dataSource.value.filter((item: DataTable) => item.id !== id)
    mapWork.deleteItemById(id)
  } else {
    console.log("删除失败")
  }
}
</script>
<style scope lang="less">
.marker-list {
  width: 100%;
  .marker-list-ul {
    display: flex;
    align-items: center;
    .marker-list-li_icon {
      height: 30px;
      padding: 5px;
      background: rgba(16, 129, 225, 0.5);
    }
  }
}
.marker-table {
  margin-top: 10px;
  width: 100%;
}
</style>
