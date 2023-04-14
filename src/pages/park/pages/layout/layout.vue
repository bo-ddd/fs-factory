<template>
  <div class="main">
    <!-- 这是layout -->
    <div class="head">
      <HeadNav defaultTitle="卡口管理" @success="hh"></HeadNav>
    </div>
    <div class="router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadNav from "../../../../components/top-nav/HeadNav.vue"
import { useRouter } from 'vue-router'

const router = useRouter();

const routeInfo = [
  {
    name: "parkInfo",
    path: "/parkInfo",
    label: {
      name: "园区信息管理"
    },
    // component: () => import("../pages/modulePage/ParkInfo.vue")
  },
  {
    // 隐患管理
    name: "hiddenTrouble",
    path: "/hiddenTrouble",
    label: {
      name:'风险分区隐患管理'
    },
    // component: () => import("../pages/modulePage/HiddenTrouble.vue")
  },
  {
      name: "MajorHazard",
      path: "/majorHazard",
      label: {
        name:'重大危险源管理'
      },
      // component: () => import("../pages/modulePage/MajorHazard.vue")
  },
  {
      name: "meetEarly",
      path: "/meetEarly",
      label: {
        name:'报警管理'
      },
      // component: () => import("../pages/modulePage/MeetEarly.vue")
  },
  {
      name: "jobSupervision",
      path: "/jobSupervision",
      label:{
        name:'特殊作业监管'
      },
      // component: () => import("../pages/modulePage/jobSupervision.vue")
  },
  {
      name: "vehicleMonitoring",
      path: "/vehicleMonitoring",
      label:{
        name:'卡口管理'
      },
      // component: () => import("../pages/modulePage/VehicleMonitoring.vue")
  },
  {
      name: "EmergencyManage",
      path: "/emergencyManage",
      label: {
        name:'应急救援管理'
      },
      // component: () => import("../pages/modulePage/emergencyManage.vue")
  }
]

const hh = function (res) {
  console.log(res);
  const jj = routeInfo.filter((el) => {
      // eslint-disable-next-line eqeqeq
      return el.label.name == res.title;
  });
  console.log(jj[0].name);
  router.push({ path: jj[0].name });
}
</script>

<style scoped>
.router {
  height: calc(100vh - 6rem);
}
.head {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
}
</style>
