<template>
  <mars-dialog :title="titleName" width="260" :min-width="240" top="60" bottom="40" right="10">
    <div class="marker-list f-pt f-mb">
      <ul class="marker-list-ul">
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

        <li class="f-mr marker-list-li_icon" title="是否绑定Popup" @click="onClickPopup">
          <mars-icon v-show="isShowPopup" icon="file-display" width="18"></mars-icon>
          <mars-icon v-show="!isShowPopup" icon="file-hiding" width="18"></mars-icon>
        </li>
      </ul>
    </div>

    <div>
      <plot-graphic-list v-if="activeTab === 'list'" />
      <plot-data-tree v-if="activeTab === 'tree'" />
    </div>
    <template #footer>
      <a-tabs v-model:activeKey="activeTab" centered type="card" tabPosition="bottom">
        <a-tab-pane key="list" tab="标号"></a-tab-pane>
        <a-tab-pane key="tree" tab="列表"></a-tab-pane>
      </a-tabs>
    </template>
  </mars-dialog>
</template>
<script setup lang="ts">
import { markRaw, ref, onMounted, onUnmounted } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import plotGraphicList from "./plot-graphic-list.vue"
import plotDataTree from "./plot-data-tree.vue"
import { useWidget } from "@mars/common/store/widget"
import axios from "axios"
import * as mapWork from "./map"

const { activate, disable, currentWidget, updateWidget } = useWidget()

const titleName = ref("图上标绘")
onMounted(async () => {
  if (currentWidget.data) {
    titleName.value = currentWidget.data.title
  }

  // 实际系统时可以注释下面代码，该代码是mars3d官网在线加载演示数据
  const defultJsonUrl = "//data.mars3d.cn/file/geojson/mars3d-draw.json"
  const result = await axios.get(defultJsonUrl)
  mapWork.defultData(result.data)
})

onUnmounted(() => {
  disable("graphic-editor")
})

currentWidget.onUpdate(() => {
  mapWork.graphicListTree()
})

// 启用map.ts生命周期
useLifecycle(mapWork)
const activeTab = ref("list")

let lastUUid = ""
mapWork.eventTarget.on("editStart", (e: any) => {
  // 挂载 graphic
  if (lastUUid !== e.graphic.id) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(e.graphic)
      }
    })
    lastUUid = e.graphic.id
  } else {
    lastUUid = ""
  }
})

mapWork.eventTarget.on("editorHide", () => {
  lastUUid = ""
  disable("graphic-editor")
})

// 监听到矢量数据发生变化
mapWork.eventTarget.on("updata", (e: any) => {
  // 挂载 graphic
  updateWidget("graphic-editor", e.graphic)
})

// 是否编辑
const lockEditor = ref(true)
const onClickMarkerEditor = () => {
  lockEditor.value = !lockEditor.value

  mapWork.onClickMarkerEditor(lockEditor.value)
}

// ****************************文件************************* //

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

// 保存文件
const onClickMarkerSavefile = () => {
  mapWork.onClickMarkerSavefile()
}

// 打开文件
const onClickMarkerOpenfile = (info: FileInfo) => {
  activeTab.value = "list"
  mapWork.impFile(info.file, true)
}

// 叠加文件
const onClickMarkerOverfile = (info: FileInfo) => {
  mapWork.impFile(info.file, false)
}

// 清除
const onClickMarkerDeleteAll = () => {
  activeTab.value = "list"
  mapWork.onClickMarkerDeleteAll()
}

// 是否显示popup
const isShowPopup = ref(false)
const onClickPopup = () => {
  isShowPopup.value = !isShowPopup.value
  mapWork.isShowPopup(isShowPopup.value)
}
</script>

<style lang="less" scoped>
.marker-list {
  width: 100%;
  .marker-list-ul {
    display: flex;
    align-items: center;
  }
}

.marker-list-li_icon {
  padding: 5px 5px 0;
  background: rgba(16, 129, 225, 0.5);
}
:deep(.ant-tabs-nav) {
  margin: 0;
}
:deep(.ant-input-number) {
  width: 100%;
}
</style>
