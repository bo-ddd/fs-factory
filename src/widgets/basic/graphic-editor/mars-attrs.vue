<template>
  <a-collapse :activeKey="['1']">
    <a-collapse-panel key="1" :showArrow="false" header="属性信息">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <tr v-for="(item, i) in attrComps" :key="i">
          <td>{{ item.label }}</td>
          <td>
            <component :is="getComponent(item.type as any)" size="small" v-model:value="attributies[item.name]" @change="unionChange(item)">
              <template v-if="item.type === 'label'">{{ attributies[item.name] }}</template>
            </component>
          </td>
        </tr>
      </table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { isBoolean, isNumber } from "lodash"

const props = defineProps<{
  attrs: any
}>()

const emit = defineEmits(["attrChange"])

const components = {
  number: "mars-input-number",
  radio: "mars-switch",
  slider: "mars-slider",
  color: "mars-color-picker",
  combobox: "mars-select",
  textarea: "mars-textarea",
  label: "span",
  text: "mars-input"
}
function getComponent(type: keyof typeof components) {
  return components[type]
}

const attributies = ref<any>(null) // 全部的属性

const attrComps = ref<any[]>([]) // 展示的属性

watch(
  props,
  () => {
    attributies.value = props.attrs
    if (props.attrs) {
      const ac: any[] = Object.keys(props.attrs)
        .filter((k) => !["id", "name", "remark"].includes(k))
        .map((k) => {
          let type = "text"
          if (isBoolean(attributies[k])) {
            type = "radio"
          }
          if (isNumber(attributies[k])) {
            type = "number"
          }
          return { name: k, label: k, type }
        })
      attrComps.value = [
        { name: "id", label: "主键", type: "label", defval: "" },
        { name: "name", label: "名称", type: "text", defval: "" },
        { name: "remark", label: "备注", type: "textarea", defval: "" }
      ]
    }
  },
  {
    immediate: true
  }
)

function unionChange(item: any) {
  emit("attrChange", {
    name: item.name,
    value: attributies.value[item.name]
  })
}
</script>

<style lang="less" scoped></style>
