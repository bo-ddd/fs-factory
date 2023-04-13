<template>
  <div>
    <div class="top-nav">
      <div class="LOGO">
        <img class="icon-get" src="../../../public/img/parkInfo/LOGO.png" alt="" />
        <div class="textshadow">佛山智慧化工</div>
      </div>
      <div class="nav-list">
        <div class="nav-font" @click="nav(item)" v-for="(item, i) in tabledate" :key="i">
          <div :class="[item.isActive ? 'box' : '']"></div>
          <div class="nav-get">{{ item.title }}</div>
          <div class="nav-border"></div>
        </div>
      </div>
      <div class="time-stamp">{{ timechuo }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
const timechuo:Ref<string> = ref('');
const tabledate: any = [
  {
    title: '园区信息管理',
    id: 1,
    isActive: true
  },
  {
    title: '资产管理',
    id: 2,
    isActive: false
  },
  {
    title: '安防监控管理',
    id: 3,
    isActive: false
  },
  {
    title: '能源管理',
    id: 4,
    isActive: false
  },
  {
    title: '人员管理',
    id: 5,
    isActive: false
  },
  {
    title: '统计分析',
    id: 6,
    isActive: false
  },
  {
    title: '设备管理',
    id: 7,
    isActive: false
  },
]
setInterval(() => {
  const date: any = new Date()
  const Y: any = date.getFullYear() + ' - '
  const M: any = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ' - '
  const D: any = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h: any = date.getHours() + ':'
  const m: any = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s: any = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  timechuo.value = Y + M + D + h + m + s
}, 1000)

const nav = (item: any) => {
  tabledate.forEach((i: any) => {
    i.isActive = false;
  })
  item.isActive = !item.isActive;
}
</script>

<style lang="scss">
.top-nav {
  width: 100vw;
  height: 6rem;
  background-image: linear-gradient(180deg, rgba(0, 21, 255, 0.3), rgba(0, 0, 0, 0));
  display: flex;
  justify-content: space-around;
  align-items: center;

  .LOGO {
    width: 35rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    gap: 13px;
    margin-left: 4.4rem;

    .textshadow {
      font-size: 2.4rem;
      font-weight: 700;
      color: #9ad1f6;
      font-style: italic;
      text-shadow: 3px 1px 3px rgb(0, 234, 255);
      width: 247px;
    }
  }

  .nav-list {
    height: 6rem;
    display: flex;
    align-items: center;
    gap: 71px;
    color: #fff;
    width: 95rem;

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
    }
  }

  .time-stamp {
    width: 16rem;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 1.8rem;
    white-space: nowrap;
  }
}
</style>
