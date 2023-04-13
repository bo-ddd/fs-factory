<template>
  <mars-select v-model:value="selectVal" ref="select" :options="plotDataOptions" @change="handleChange"></mars-select>
  <div class="gltf-list">
    <ul>
      <li class="gltf-item" v-for="item in dataList" :key="item.name">
        <img :src="item.image" :title="item.name" @click="showModel(item)" class="gltf-icon" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, markRaw, computed } from "vue"
import * as mapWork from "./map"
import localforage from "localforage"
import axios from "axios"
import { useWidget } from "@mars/common/store/widget"

const { currentWidget } = useWidget()

let storeName = "plot"

let plotDataJSON = []

const plotDataOptions = ref<any[]>([]) // 下拉框数据

const selectVal = ref("") // 选中的标绘类型

const dataList = computed(() => (selectVal.value ? plotDataJSON[selectVal.value] : [])) // 供选择的标绘列表

const getPlotData = async () => {
  let baseUrl = `${process.env.BASE_URL}config/plotlist.json`
  if (currentWidget.data) {
    baseUrl = currentWidget.data.url
    storeName = currentWidget.data.name
    selectVal.value = currentWidget.data.defaultVal
    mapWork.dataType(currentWidget.data.type)
  }

  const jsonData = await axios.get(baseUrl) // 获取数据
  plotDataJSON = jsonData.data
  plotDataOptions.value = Object.keys(plotDataJSON).map((k) => ({
    value: k,
    lable: k
  }))
  imagesRender()

  const laststorage: string = await localforage.getItem(storeName) // 历史记录中选中的值

  if (currentWidget.data && currentWidget.data.type === "mars_model") {
    selectVal.value = laststorage || "人物"
  } else {
    selectVal.value = laststorage || "小模型"
  }
}
getPlotData()

function imagesRender() {
  plotDataOptions.value.forEach((imgTitle) => {
    const list = plotDataJSON[imgTitle.value]
    list.forEach((item) => {
      if (item.style && item.style.url) {
        item.image = mapWork.changeItemImage(item)
        item.style.url = mapWork.changeItemUrl(item)
      }
      let image = item.image || item.style.image

      if (image) {
        image = mapWork.updateTemplateValues(image)

        // 以"http"或者 "//"开头不做处理
        if (image.startsWith("{plotPath}")) {
          image = image.replace("{plotPath}", `${process.env.BASE_URL}img/plot`) // 是模块内部本级图片
        }
        item.image = image
      }
    })
  })
}

// 下拉框改变
function handleChange() {
  localforage.setItem(storeName, selectVal.value)
}

const showModel = (imgs: any) => {
  mapWork.startDraw(markRaw(imgs))
}
</script>

<style lang="less" scoped>
.gltf-list {
  margin-top: 10px;
  width: 100%;
  .gltf-item {
    display: inline-block;
    padding-bottom: 10px;
    margin-left: 22px;
    &:nth-of-type(3n + 1) {
      margin-left: 0;
    }
    .gltf-icon {
      width: 60px;
      height: 60px;
      border: 1.5px solid white;
    }
  }
}

.mars-select {
  width: 224px;
}
.mars3d-popup-btn_newStyle {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
}
</style>
