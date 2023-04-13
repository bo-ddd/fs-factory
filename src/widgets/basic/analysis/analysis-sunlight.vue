<template>
  <div class="analysis-common">
    <div class="analysis-common-title">
      <mars-button type="link" @click="goAnalysisOtherView('analysis')">
        <mars-icon icon="arrow-circle-left" width="20"></mars-icon>
      </mars-button>
      日照分析
    </div>

    <p class="analysis-content_tip">提示:模拟设定时间范围内的太阳光照效果。</p>

    <div class="f-mb">
      <span>日期选择器：</span>
      <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
    </div>
    <div class="f-mb">
      <a-space>时间选择：<mars-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" /></a-space>
    </div>
    <div class="f-mb">
      <a-space> 当前时间：{{ currDate }} {{ hours }} 时 {{ minutes }}分</a-space>
    </div>
    <div class="f-tac">
      <mars-button @click="onClickStartStop">
        <span>{{ start == true ? "播放" : "暂停" }}</span>
      </mars-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import dayjs from "dayjs"
import * as mapWork from "./map"

const emit = defineEmits(["goAnalysisOtherView"])

function goAnalysisOtherView(name: string) {
  emit("goAnalysisOtherView", name)
}

onMounted(() => {
  timeChange()
})

onUnmounted(() => {
  mapWork.onUnmountedSunlight()
  mapWork.eventTarget.off("changeShadow", changeShadow)
})

const start = ref(true)
const onClickStartStop = () => {
  if (start.value) {
    mapWork.startPlay(currDate.value, hours.value, minutes.value)
  } else {
    mapWork.stopPlay()
  }
  start.value = !start.value
}

const timeVal = ref<number>(420)

const currDate = ref<string>(dayjs().format("YYYY-MM-DD"))

const hours = computed(() => Math.floor(timeVal.value / 60))
const minutes = computed(() => Math.floor(timeVal.value % 60))

const timeChange = () => {
  mapWork.setShadows(currDate.value, hours.value, minutes.value)

  start.value = true
}

mapWork.eventTarget.on("changeShadow", changeShadow)
function changeShadow(event: any) {
  const date = event.shadowTime

  timeVal.value = date.getHours() * 60 + date.getMinutes()
}
</script>
<style lang="less">
.analysis-common-title {
  width: 100%;
  color: #fff;
  line-height: 100%;
  padding-top: 10px;
  padding-bottom: 4px;
  border-bottom: 1px dotted white;
  position: relative;
}
.analysis-common-title_small {
  position: absolute;
  top: 12px;
  right: 10px;
}
.f-tac {
  margin-bottom: 20px;
}

.analysis-content_tip {
  color: #cad1d1;
  padding-top: 5px;
  margin-bottom: 15px;
}

.ant-slider {
  width: 200px !important;
}
</style>
