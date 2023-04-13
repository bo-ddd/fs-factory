<template>
  <mars-dialog title="视角书签" :width="280" handles="y" top="60" right="10">
    <template #icon>
      <mars-icon icon="bookmark" width="18"></mars-icon>
    </template>

    <div class="f-mb f-pt">
      <a-space>
        <mars-input v-model:value="formState.input" placeholder="输入名称"></mars-input>
        <mars-button @click="butAddTxtName">添加</mars-button>
      </a-space>
    </div>
    <div class="bookmark-view">
      <div :class="className" :key="value.title" v-for="(value, index) in formState.imgObject">
        <img class="bookmark-view__img" :src="value.image" @click="flytoView(value)" v-show="formState.isHaveData" />
        <div class="bookmark-view__title">
          <mars-icon icon="delete" width="17" class="delete" @click="butDeleteTxtName(index, value)" v-show="formState.isHaveData"></mars-icon>

          <p class="text" :title="value.title">{{ value.title }}</p>
        </div>
      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { $message } from "@mars/components/mars-ui/index"
import * as api from "@mars/common/api"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const formState = reactive({
  input: "",
  isHaveData: false,
  imgObject: [{ id: "", title: "没有匹配的值", image: "", center: "" }] // id是接口返回的id，根据id删除历史记录
})

const className = computed(() => (formState.isHaveData ? "add-new" : "no-found"))

// 加载历史数据
const getHistoryList = async () => {
  const { code, data } = await api.getHistoricalRecordsList({ type: "mars_bookmark" })

  if (code === 200) {
    data.forEach((item: any) => {
      addImage({
        id: item.id,
        title: item.title,
        image: JSON.parse(item.content).image,
        center: JSON.parse(item.content).center
      })
    })
  }
}
getHistoryList()

// 添加视角书签
const butAddTxtName = async () => {
  const name = formState.input

  if (!name) {
    $message("请输入名称")
    return
  }

  // 不能使用相同名称
  if (formState.imgObject.some((data) => data.title === name)) {
    $message(name + " 已存在，请更换名称!")
    return
  }

  // 获取图片以及视角信息
  const { image, center } = await mapWork.butAddTxtName()

  addImage({
    title: name,
    image: image,
    center: center
  })

  // UI处理
  formState.input = ""
}

function addImage(item: any) {
  // 移除未匹配项
  if (formState.imgObject[0].image === "" && item) {
    formState.imgObject.splice(0, 1)
    formState.isHaveData = true
  }
  formState.imgObject.push(item)

  if (!item.id) {
    addMarkerPointHistory(item)
  }
}

// 视角操作
const flytoView = (val: any) => {
  mapWork.flytoView(val.center)
}

const butDeleteTxtName = (index: number, item: any) => {
  deleteGraphicById(item.id, index)
}

// 添加数据至后台
const addMarkerPointHistory = async (historyData: any) => {
  const { data, code } = await api.addHistoricalRecords({
    title: historyData.title,
    type: "mars_bookmark",
    content: JSON.stringify({ center: historyData.center, image: historyData.image })
  })

  if (code === 200) {
    formState.imgObject[formState.imgObject.length - 1].id = data.id // 给数组最后一个赋值id
  } else {
    console.log("添加失败", historyData, code)
  }
}

// 删除对应id的记录和数据
const deleteGraphicById = async (id: string, index: number) => {
  const { code } = await api.deleteHistoricalRecordsById(id)

  if (code === 200) {
    formState.imgObject.splice(index, 1)
    if (formState.imgObject.length === 0) {
      formState.imgObject = [{ id: "", title: "没有匹配的值", image: "", center: "" }]
      formState.isHaveData = false
    }
  } else {
    console.log("删除失败")
  }
}
</script>
<style scoped lang="less">
.bookmark-view {
  width: 100%;
  height: calc(100% - 100px);
  border-radius: 5px;
}
.bookmark-view__img {
  height: 160px;
  width: 100%;
  z-index: 0;
  object-fit: fill;
}
.mars-input {
  width: 186px;
}

.no-found {
  border: none;
  width: 100%;
  text-align: center;
}
.add-new {
  position: relative;
  border: 1px solid white;
  margin-top: 10px;
  .bookmark-view__title {
    height: 30px;
    overflow: hidden;
    .text {
      white-space: nowrap;
      overflow-x: hidden;
      line-height: 30px;
      text-align: center;
      text-overflow: ellipsis;
      text-align: center;
      color: white;
      padding: 0 10px;
    }
    .delete {
      float: right;
      margin: 5px 5px;
    }
  }
  &:hover {
    background-color: #3e3d35;
    border-color: #2f659a;
  }
}
</style>
