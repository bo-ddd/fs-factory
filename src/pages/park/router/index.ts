import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    name: "login",
    path: "/",
    component: () => import("../pages/login/login.vue")
  },
  {
    name: "layout",
    path: "/layout",
    redirect: "/parkInfo",
    component: () => import("../pages/layout/layout.vue"),
    children: [
      {
        // 重大危险源监管
        // 重大危险源安全管理
        name: "MajorHazard",
        path: "/majorHazard",
        component: () => import("../pages/modulePage/MajorHazard.vue")
      },
      {
        // 应急管理模块
        // 敏捷应急
        name: "EmergencyManage",
        path: "/emergencyManage",
        component: () => import("../pages/modulePage/emergencyManage.vue")
      },
      {
        // 特殊作业监管
        // 特殊作业管理
        name: "jobSupervision",
        path: "/jobSupervision",
        component: () => import("../pages/modulePage/jobSupervision.vue")
      },
      {
        // 人/车/物流监控
        // 封闭化管理
        name: "vehicleMonitoring",
        path: "/vehicleMonitoring",
        component: () => import("../pages/modulePage/VehicleMonitoring.vue")
      },
      {
        // 园区信息管理
        // 安全基础管理
        name: "parkInfo",
        path: "/parkInfo",
        component: () => import("../pages/modulePage/ParkInfo.vue")
      },
      {
        // 报警管理
        name: "meetEarly",
        path: "/meetEarly",
        component: () => import("../pages/modulePage/MeetEarly.vue")
      },
      {
        // 风险分区
        name: "riskControl",
        path: "/riskControl",
        component: () => import("../pages/modulePage/RiskControl.vue")
      },
      {
        // 隐患管理
        // 双重预防机制
        name: "hiddenTrouble",
        path: "/hiddenTrouble",
        component: () => import("../pages/modulePage/HiddenTrouble.vue")
      },
      {
        // 安防监控管理
        name: "securityMonitoringManagement",
        path: "/securityMonitoringManagement",
        component: () => import("../pages/modulePage/securityMonitoringManagement.vue")
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name !== undefined && to.name === "securityMonitoringManagement") {
    console.log("从", from.name, "来");
    console.log("到", to.name, "去");
    
    window.localStorage.setItem("isFirst", "abcdefg")
  }
  next()
})
