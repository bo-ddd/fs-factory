<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-if="showAssist" key="1" :showArrow="false" header="批量修改高程（辅助功能）">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <tr>
          <td>在原值上增加</td>
          <td>
            <mars-input-number size="small" v-model:value="elevationAdder" :step="1" @change="increase"></mars-input-number>
          </td>
        </tr>
        <tr>
          <td>全部修改为</td>
          <td>
            <mars-input-number size="small" v-model:value="elevationValue" :step="1" @change="coverLonlats"></mars-input-number>
          </td>
        </tr>

        <tr>
          <td>速度(km/h)</td>
          <td>
            <mars-input-number size="small" v-model:value="speed" :step="1" @change="allSpeedChange"></mars-input-number>
          </td>
        </tr>
      </table>
    </a-collapse-panel>
    <a-collapse-panel key="2" :showArrow="false" header="坐标列表">
      <template v-for="(item, i) in lonlats" :key="i">
        <p class="position-title" :span="24">
          <span> 第 {{ i + 1 }} 点</span>
          <a-space class="position-title__subfix">
            <mars-icon icon="add-one" width="16" @click="addItem(item, i)"></mars-icon>
            <mars-icon icon="delete" width="16" @click="deleteItem(i)"></mars-icon>
          </a-space>
        </p>
        <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
          <tr>
            <td>经度</td>
            <td>
              <mars-input-number size="small" v-model:value="item[0]" :step="0.000001" @change="pointChange(props.lonlats)"></mars-input-number>
            </td>
          </tr>

          <tr>
            <td>纬度</td>
            <td>
              <mars-input-number size="small" v-model:value="item[1]" :step="0.000001" @change="pointChange(props.lonlats)"></mars-input-number>
            </td>
          </tr>

          <tr>
            <td>高程</td>
            <td>
              <mars-input-number size="small" v-model:value="item[2]" :step="0.1" @change="pointChange(props.lonlats)"></mars-input-number>
            </td>
          </tr>

          <tr v-if="lonlats.length - 1 > i">
            <td>速度(km/h)</td>
            <td>
              <mars-input-number size="small" v-if="speedArr" v-model:value="speedArr[i]" :step="1" @change="speedChange"></mars-input-number>
            </td>
          </tr>
        </table>
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import _ from "lodash"

const props = defineProps<{
  lonlats: any[]
}>()

let originLonlats: any[] = []
const speedArr = ref<any>()
const setPostions = (postions: any, speedList: any) => {
  originLonlats = postions
  speedArr.value = speedList || new Array(postions.length - 1).fill(50)
}

defineExpose({
  setPostions
})

const activeKey = ref(["1", "2"])
const showAssist = computed(() => props.lonlats.length > 1 && props.lonlats[1].length >= 3)
const elevationAdder = ref()
const elevationValue = ref()
const speed = ref()

const emit = defineEmits(["pointChange", "speedChange"])

function pointChange(lonlats: any[]) {
  emit("pointChange", lonlats)
}

function increase() {
  const lonlats = _.cloneDeep(originLonlats)
  lonlats.forEach((item) => {
    item[2] += elevationAdder.value
  })
  pointChange(lonlats)
}

function coverLonlats() {
  const lonlats = _.cloneDeep(originLonlats)
  lonlats.forEach((item) => {
    item[2] = elevationValue.value
  })
  pointChange(lonlats)
}

// 添加新的坐标点
function addItem(item: any, index: number) {
  const lonlats = _.cloneDeep(props.lonlats)
  lonlats.splice(index, 0, _.cloneDeep(item))
  pointChange(lonlats)
}

// 删除坐标点
function deleteItem(index: number) {
  const lonlats = _.cloneDeep(props.lonlats)
  lonlats.splice(index, 1)
  pointChange(lonlats)
}

// 速度发生改变
const speedChange = () => {
  emit("speedChange", speedArr.value)
}

// 统一修改速度
const allSpeedChange = () => {
  const addSpeed = speedArr.value
  const newSpeed: any = []
  addSpeed.forEach((item: any) => {
    item = speed.value

    newSpeed.push(item)
  })
  speedArr.value = newSpeed

  speedChange()
}
</script>

<style lang="less" scoped>
.position-title {
  border-left: 2px solid #ffffff;
  background-color: rgba(32, 42, 68, 0.5);
  padding-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.position-title__subfix {
  float: right;
  :deep(.mars-icon) {
    cursor: pointer;
  }
}
</style>
