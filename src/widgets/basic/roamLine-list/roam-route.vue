<template>
  <div>
    <div class="f-pt f-tac f-mb">
      <a-space>
        <mars-button @click="addLine">
          <template #icon>
            <mars-icon icon="add-one" width="20"></mars-icon>
          </template>
          新增路线
        </mars-button>
        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson"
          :file-list="fileList"
          :showUploadList="false"
          :supportServerRender="true"
          :beforeUpload="beforeUpload"
          @change="importFile"
        >
          <mars-button>导入</mars-button>
        </a-upload>
        <mars-button @click="saveFile">导出</mars-button>
      </a-space>
    </div>

    <mars-table :columns="columns" :data-source="roamLineData" bordered size="small" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <mars-icon icon="take-off" @click="startRoamFly(record)" width="20" />
            <mars-icon icon="edit-two" width="20" @click="showEditor(record)" />
            <mars-icon icon="delete" width="20" @click="deleteRoam(record)" />
          </a-space>
        </template>
      </template>
    </mars-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map"

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

const fileList = ref<FileItem>()

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    align: "center"
  }
]

interface TableItem {
  name: string
  key: string
}
const roamLineData = ref<TableItem[]>([])

const setData = (fData: any[]) => {
  roamLineData.value = []
  fData.forEach((fd) => {
    if (JSON.parse(fd.content || null)?.attr?.name) {
      roamLineData.value.push({
        key: fd.id,
        name: JSON.parse(fd.content).attr?.name
      })
    }
  })
}

defineExpose({
  setData
})

const emit = defineEmits(["editData", "routeData", "roamStart", "deleteFlyData", "saveFile", "importFile"])

// 新增漫游路线
const addLine = () => {
  mapWork.addLine()
}

// 开始漫游
const startRoamFly = (item: any) => {
  emit("roamStart", item.key)
}

// 删除漫游
const deleteRoam = (item: any) => {
  emit("deleteFlyData", item.key)
}

// 保存文件
const saveFile = () => {
  emit("saveFile")
}

// 打开文件
const beforeUpload = (file: FileItem) => {
  return false
}

// 导入文件
const importFile = async (info: FileInfo) => {
  emit("importFile", info)
}

// 显示属性编辑面板
const showEditor = (item: any) => {
  emit("editData", item.key)
}
</script>

<style lang="less" scoped></style>
