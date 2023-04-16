<template>
  <div class="main">
    <!-- 这是layout -->
    <div class="head">
      <HeadNav @success="hh"></HeadNav>
    </div>
    <div class="router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadNav from "../../../../components/top-nav/HeadNav.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const routeInfo = [
  {
    name: "parkInfo",
    path: "/parkInfo",
    label: {
      name: "安全基础管理"
    }
  },
  {
    name: "securityMonitoringManagement",
    path: "/securityMonitoringManagement",
    label: {
      name: "卡口监控"
    }
  },
  {
    name: "hiddenTrouble",
    path: "/hiddenTrouble",
    label: {
      name: "双重预防机制"
    }
  },
  {
    name: "MajorHazard",
    path: "/majorHazard",
    label: {
      name: "重大危险源安全管理"
    }
  },
  // {
  //   name: "meetEarly",
  //   path: "/meetEarly",
  //   label: {
  //     name: "报警管理"
  //   }
  // },
  {
    name: "jobSupervision",
    path: "/jobSupervision",
    label: {
      name: "特殊作业管理"
    }
  },
  {
    name: "vehicleMonitoring",
    path: "/vehicleMonitoring",
    label: {
      name: "封闭化管理"
    }
  },
  {
    name: "EmergencyManage",
    path: "/emergencyManage",
    label: {
      name: "敏捷应急"
    }
  }
]

const hh = function (res) {
  const jj = routeInfo.filter((el) => {
    // eslint-disable-next-line eqeqeq
    return el.label.name == res.title;
  })
  
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
