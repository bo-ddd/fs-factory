<template>
  <div>
    <div class="top-nav">
      <div class="LOGO">
        <img class="icon-get" src="../../../public/img/parkInfo/LOGO.png" />
        <div class="textshadow">浮山化工园区安全监管平台</div>
      </div>
      <div class="nav-list">
        <template v-for="(item, i) in tabledate" :key="i">
          <div class="nav-font" @click="nav(item)">
            <div :class="[ (router.currentRoute.value.href==item.path||(item.path=='/vehicleMonitoring'&&router.currentRoute.value.href=='/securityMonitoringManagement') )? 'box' : '']"></div>
            <div class="nav-get">{{ item.title }}</div>
            <div class="nav-border"></div>
          </div>
        </template>
      </div>
      <div class="time-stamp">{{ timechuo || '2023 - 04 - 17 17:06:08' }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref, toRefs, defineEmits, reactive } from "vue"
import { useRouter } from "vue-router"

let router: any = useRouter()

const props = defineProps<{
  defaultTitle?: string
}>()
const { defaultTitle } = toRefs(props)

const emits = defineEmits(["success"])

const timechuo: Ref<string> = ref("")
const tabledate: any = reactive([
  {
    title: "安全基础管理",
    id: 1,
    isActive: true,
    path: "/parkInfo"
  },
  // {
  //   title: "卡口监控",
  //   id: 11,
  //   isActive: false,
  //   // path: "/securityMonitoringManagement",
  //   path: "/vehicleMonitoring"
  // },
  {
    title: "双重预防机制",
    id: 2,
    isActive: false,
    path: "/hiddenTrouble"
  },
  {
    title: "重大危险源安全管理",
    id: 3,
    isActive: false,
    path: "/MajorHazard"
  },
  // {
  //   title: "报警管理",
  //   id: 5,
  //   isActive: false,
  //   path: "/meetEarly",
  // },
  {
    title: "特殊作业管理",
    id: 4,
    isActive: false,
    path: "/jobSupervision"
  },
  {
    title: "封闭化管理",
    id: 5,
    isActive: false,
    path: "/vehicleMonitoring"
  },
  {
    title: "敏捷应急",
    id: 6,
    isActive: false,
    path: "/EmergencyManage"
  }
])

setInterval(() => {
  const date: any = new Date()
  const Y: any = date.getFullYear() + " - "
  const M: any = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + " - "
  const D: any = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " "
  const h: any = date.getHours() + ":"
  const m: any = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":"
  const s: any = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  timechuo.value = Y + M + D + h + m + s
}, 1000)

const nav = (item: any) => {
  emits("success", item)
}
</script>

<style lang="scss">
.nav-get {
  line-height: initial;
  font-size: 2.4rem;
  font-weight: bold;
}
.top-nav {
  width: 100%;
  height: 6rem;
  background-image: linear-gradient(180deg, rgba(0, 21, 255, 0.3), rgba(0, 0, 0, 0));
  display: flex;
  justify-content: space-around;
  align-items: center;

  .LOGO {
    height: 3.5rem;
    display: flex;
    align-items: center;
    gap: 0 2rem;

    .textshadow {
      line-height: initial;
      font-size: 2.4rem;
      font-weight: 700;
      color: #9ad1f6;
      font-style: italic;
      text-shadow: 3px 1px 3px rgb(0, 234, 255);
    }
  }

  .nav-list {
    height: 4rem;
    display: flex;
    align-items: center;
    gap: 6rem;
    color: #fff;

    .nav-font {
      font-size: 1.1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      white-space: nowrap;
      cursor: pointer;

      .icon-get {
        width: 121px;
      }

      .box {
        box-shadow: 2px 0px 34px 41px #29a8ff;
      }
    }

    .nav-border {
      width: 2.6rem;
      height: 1rem;
      border-bottom: 3px solid #fff;
      box-sizing: content-box;
    }
  }

  .time-stamp {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 2.4rem;
    white-space: nowrap;
  }
}
</style>
