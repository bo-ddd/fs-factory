<template>
  <div>
    <table v-if="attrValue" class="mars-primary-table" border bordercolor="#ffffff" cellspacing="0" cellpadding="0">
      <tr v-for="(item, i) in attrConfig" :key="i">
        <td class="label">{{ item.label }}</td>
        <td>
          <component :is="getComponent(item.type)" v-model:value="attrValue[item.name]" size="small" :options="item.data || []"></component>
        </td>
      </tr>
    </table>

    <div class="f-pt f-tac">
      <a-space>
        <mars-button @click="startRoamFly">开始漫游</mars-button>
        <mars-button @click="downloadJson">下载JSON</mars-button>
        <mars-button @click="clearLine">删除路线</mars-button>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import attrJson from "./config/attr.json"
import _ from "lodash"

const components = {
  number: "mars-input-number",
  radio: "mars-switch",
  slider: "mars-slider",
  color: "mars-color-picker",
  combobox: "mars-select",
  textarea: "mars-textarea",
  label: "mars-input"
}
const showImpacts = ref<any[]>([])
const attrValue = ref<any>(null)
const attrConfig = attrJson.polyline.attr

const setAttr = (params: any) => {
  if (params) {
    attrValue.value = _.cloneDeep(params)
    setDefault()
    setImpacts()
  }
}

defineExpose({
  setAttr
})

function setImpacts() {
  let allImpacts: any[] = []
  if (attrConfig) {
    attrConfig.forEach((item: any) => {
      if (item.impact && attrValue.value[item.name] === true) {
        allImpacts = allImpacts.concat(item.impact)
      }
      if (item.data && _.isArray(item.data)) {
        item.data.forEach((op: any) => {
          if (op.impact && attrValue.value[item.name] === op.value) {
            allImpacts = allImpacts.concat(op.impact)
          }
        })
      }
    })
  }
  showImpacts.value = _.uniq(allImpacts)
}

function setDefault() {
  if (attrConfig) {
    attrConfig.forEach((item: any) => {
      if (!attrValue.value[item.name] && attrValue.value[item.name] !== 0 && attrValue.value[item.name] !== false) {
        attrValue.value[item.name] = item.defval
      }
    })
  }
  emit("attrData", attrValue.value)
}

function getComponent(type: string) {
  return components[type as keyof typeof components]
}

const emit = defineEmits(["attrData", "delete", "downloadJson", "startPlay"])

// 开始漫游
const startRoamFly = () => {
  emit("startPlay")
}

// 清除路线
const clearLine = () => {
  emit("delete")
}

// 下载json数据
const downloadJson = () => {
  emit("downloadJson")
}
</script>
<style scoped lang="less">
.mars-primary-table {
  width: 100%;
  border-collapse: collapse;
  .label {
    width: 100px;
  }
}
</style>
