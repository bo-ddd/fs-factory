<template>
  <mars-dialog title="地区导航" width="335" :top="60" :right="10">
    <template #icon>
      <mars-icon icon="navigation" width="18"></mars-icon>
    </template>

    <a-tabs class="location-region-tabs" v-model:activeKey="activeKey">
      <a-tab-pane key="1">
        <template #tab>
          <p class="nacigation-icon" @click="onClickBack">
            <mars-icon icon="world" width="20"></mars-icon>
            全国
          </p>
        </template>

        <p class="f-mb" v-for="(item, key) in provinceAddress" :key="key">
          <a-row>
            <a-col :span="4">{{ key }}</a-col>
            <a-col :span="20">
              <a-space>
                <p
                  v-for="p in item"
                  :key="p.code"
                  @click="onClickNextLayer(p.address, p.code)"
                  :class="{ 'navigation-p': true, active: p.address === showProvince }"
                >
                  {{ p.address }}
                </p>
              </a-space>
            </a-col>
          </a-row>
        </p>
      </a-tab-pane>

      <a-tab-pane key="2" v-if="activeKey !== '1'">
        <template #tab>
          <p class="nacigation-icon">
            <mars-icon icon="city-one" width="20"></mars-icon>
            {{ showProvince || "城市" }}
          </p>
        </template>

        <a-space>
          <p
            v-for="(c, key) in city[0].options"
            :key="key"
            @click="onClickNextLayer(c.properties.name, c.properties.adcode)"
            :class="{ 'navigation-p': true, active: c.properties.name === showCity }"
          >
            {{ c.properties.name }}
          </p>
        </a-space>
      </a-tab-pane>

      <a-tab-pane key="3" v-if="activeKey === '3'">
        <template #tab>
          <p class="nacigation-icon">
            <mars-icon icon="puzzle" width="20"></mars-icon>
            {{ showCity || "县区" }}
          </p>
        </template>

        <a-space>
          <p
            v-for="(c, key) in cityData[0].options"
            :key="key"
            @click="onClickNextLayer(c.properties.name, c.properties.adcode)"
            :class="{ 'navigation-p': true, active: c.properties.name === showCountry }"
          >
            {{ c.properties.name }}
          </p>
        </a-space>
      </a-tab-pane>
    </a-tabs>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import axios from "axios"

// 启用map.ts生命周期
useLifecycle(mapWork)

const activeKey = ref("1")
const showProvince = ref("")
const showCity = ref("")
const showCountry = ref("")

const provinceAddress = ref<Record<string, any[]>>()
let provinceData: any

async function getProvinces() {
  const HB: any = [] // 华北地区
  const DB: any = [] // 东北地区
  const HD: any = [] // 华东地区
  const HZ: any = [] // 华中地区
  const HN: any = [] // 华南地区
  const XN: any = [] // 西南地区
  const XB: any = [] // 西北地区
  const GAT: any = [] // 港澳台地区

  const provinceUrl = "//data.mars3d.cn/file/geojson/areas/100000_full.json"

  const { data } = await axios.get(provinceUrl)
  provinceData = data.features
  data.features.forEach((item: any) => {
    if (item.properties.adcode <= 150000) {
      HB.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 230000 && item.properties.adcode >= 210000) {
      DB.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 370000 && item.properties.adcode >= 310000) {
      HD.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 430000 && item.properties.adcode >= 410000) {
      HZ.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 460000 && item.properties.adcode >= 440000) {
      HN.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 540000 && item.properties.adcode >= 500000) {
      XN.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }

    if (item.properties.adcode <= 650000 && item.properties.adcode >= 610000) {
      XB.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }
    if (item.properties.adcode > 650000) {
      GAT.push({
        address: item.properties.name,
        code: item.properties.adcode
      })
    }
  })

  provinceAddress.value = {
    "华 北": HB,
    "东 北": DB,
    "华 东": HD,
    "华 中": HZ,
    "华 南": HN,
    "西 南": XN,
    "西 北": XB,
    "港 澳台": GAT
  }
}

getProvinces()

let cityArr: any[]
let selectCity: any
const cityData = ref<any[]>([])
const city = ref<any[]>([])

const onClickNextLayer = async (address: string, code: any) => {
  if (activeKey.value === "3") {
    for (let i = 0; i < city.value.length; i++) {
      const select = city.value[i].options.filter((item) => item.properties.name === address)
      showCountry.value = address
      mapWork.centerAtRegion(select[0])
    }
    return
  }

  if (activeKey.value === "1") {
    selectCity = provinceData.filter((item) => item.properties.name === address)
    showProvince.value = address
  }

  if (activeKey.value === "2") {
    selectCity = city.value[0].options.filter((item) => item.properties.name === address)
    showCity.value = address
    mapWork.centerAtRegion(selectCity[0])
  }

  if (selectCity[0] && selectCity[0].properties.level !== "district") {
    if (selectCity[0].properties.adcode === 710000) {
      // 台湾省特殊处理
      mapWork.centerAtRegion(selectCity[0])
      return
    }

    const { data } = await axios.get("//data.mars3d.cn/file/geojson/areas/" + code + "_full.json")
    cityArr = data.features
    city.value.push({
      name: address,
      options: cityArr
    })
    mapWork.centerAtRegion(selectCity[0])
    activeKey.value = "2"
  }

  if (city.value.length > 1) {
    cityData.value = city.value.filter((item) => item.name === address)
    activeKey.value = "3"
  }
}

const onClickBack = () => {
  activeKey.value = "1"
  showProvince.value = ""

  city.value = []
  cityArr = null
  mapWork.goHome()
}
</script>

<style scoped lang="less">
.navigation-p {
  padding: 2px 5px;
  color: var(--mars-text-color);
  &:hover {
    border-radius: 2px;
    background-color: #0588fb;
  }
}
.active {
  border-radius: 2px;
  background-color: #0588fb;
}
.location-region-tabs {
  :deep(.ant-tabs-tab) {
    padding: 0;
    margin-top: 10px;
    color: var(--mars-base-color) !important;
  }
  :deep(.ant-col-4) {
    color: white;
    // color: cyan;
  }
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
.nacigation-icon {
  align-items: flex-start;
}
</style>
