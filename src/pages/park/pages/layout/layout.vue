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
      name: "园区信息管理"
    }
  },
  {
    name: "securityMonitoringManagement",
    path: "/securityMonitoringManagement",
    label: {
      name: "安防监控管理"
    }
  },
  {
    name: "hiddenTrouble",
    path: "/hiddenTrouble",
    label: {
      name: "风险分区隐患管理"
    }
  },
  {
    name: "MajorHazard",
    path: "/majorHazard",
    label: {
      name: "重大危险源管理"
    }
  },
  {
    name: "meetEarly",
    path: "/meetEarly",
    label: {
      name: "报警管理"
    }
  },
  {
    name: "jobSupervision",
    path: "/jobSupervision",
    label: {
      name: "特殊作业监管"
    }
  },
  {
    name: "vehicleMonitoring",
    path: "/vehicleMonitoring",
    label: {
      name: "卡口管理"
    }
  },
  {
    name: "EmergencyManage",
    path: "/emergencyManage",
    label: {
      name: "应急救援管理"
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
