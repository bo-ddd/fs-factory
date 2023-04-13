<template>
  <div class="border">
    <div class="box">
      <div class="security-risk">
        <dv-border-box-11 title="安全风险监管">
          <div class="flex left-top">
            <dv-active-ring-chart :config="cake" style="width: 15rem; height: 15rem" />
            <dv-active-ring-chart :config="cake" style="width: 15rem; height: 15rem" />
            <dv-active-ring-chart :config="cake" style="width: 15rem; height: 15rem" />
          </div>
          <dv-capsule-chart :config="config" style="width: 50rem; height: 20rem" />
        </dv-border-box-11>
      </div>
      <div class="operation-process">
        <dv-border-box-11 title="安全走势图">
          <div class="flex left-bottom">
            <LineChart></LineChart>
          </div>
        </dv-border-box-11>
      </div>
      <div class="middle">
        <dv-border-box-12 class="flex-col">
                
          <p class="title">风险分布</p>

          <div class="top">
            <p class="lable">风险<span class="num">10</span>处</p>
            <p class="lable">隐患<span class="num">10</span>处</p>
          </div>
        <div class="bottom"> 

                <Histogram></Histogram>
        </div>
        </dv-border-box-12>
      </div>
      <div class="hidden-treatment">
        <dv-border-box-11 title="隐患排查治理">
          <div class="right right-top">
            <dv-scroll-board :config="row" style="width: 55rem; height: 28rem" />
          </div>
        </dv-border-box-11>
      </div>
      <div class="hidden-type">
        <dv-border-box-11 title="隐患类型">
          <div class="right flex right-bottom">
            <dv-conical-column-chart :config="column" style="width: 50rem; height: 30rem" />
          </div>
        </dv-border-box-11>
      </div>
    </div>
</div>
</template>
<script setup lang="ts">
import LineChart from "../../../../components/HiddenTrouble/HiddenLineChart/HiddenLineChart.vue"
import Histogram from "../../../../components/HiddenTrouble/HiddenHistogram/HiddenHistogram.vue"
import { reactive } from "vue"
const config = reactive({
  radius: "50%",
  activeRadius: "60%",
  data: [
    {
      name: "生产",
      value: 55
    },
    {
      name: "出售",
      value: 120
    },
    {
      name: "买进",
      value: 78
    },
    {
      name: "税务",
      value: 66
    }
  ],
  digitalFlopStyle: {
    fontSize: 20
  },
  showOriginValue: true,
  lineWidth: 10
})
const cake = reactive({
  data: [
    {
      name: "火灾",
      value: 1
    },
    {
      name: "气体泄露",
      value: 10
    },
    {
      name: "辐射",
      value: 0
    },
    {
      name: "行人安全",
      value: 3
    },
    {
      name: "失窃",
      value: 0
    }
  ],
  showValue: true,
  activeTimeGap: 5000
})
const column = reactive({
  data: [
    {
      name: "火灾",
      value: 1
    },
    {
      name: "气体泄露",
      value: 10
    },
    {
      name: "辐射",
      value: 0
    },
    {
      name: "行人安全",
      value: 3
    },
    {
      name: "失窃",
      value: 0
    }
  ],
  showValue: true
})
const row = reactive({
  header: ["隐患", "是否处理", "负责人"],
  data: [
    ["火灾", "已处理", "安全部马格烜"],
    ["气体泄露", "已处理", "安全部侯任性"],
    ["液体泄漏", "已处理", "安全部侯任性"],
    ["工程车", "已处理", "安全部朱大壮"],
    ["辐射物质", "已处理", "安全部朱大壮"],
    ["设施设备", "已处理", "安全部王胖胖"],
    ["储存区", "已处理", "安全部王胖胖"],
    ["静电", "已处理", "安全部朱大壮"],
    ["现场安全", "已处理", "安全部马格烜"],
    ["生产", "已处理", "安全部王胖胖"]
  ],
  index: true,
  columnWidth: [50],
  align: ["center"]
})
const enviroment = reactive({
  value: 66,
  borderWidth: 5,
  borderRadius: 10,
  borderGap: 5
})
</script>
<style scoped lang="scss">
.border{
        height:100vh;
}
.box {
  background: url("../../assets/images/bg.gif");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: grid;
  box-sizing: border-box;
  padding: 3rem 1rem;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "security-risk  middle  hidden-treatment"
    "operation-process  middle  hidden-type";
}

.mt-2 {
  margin-top: 2rem;
}

.mt-6 {
  margin-top: 6rem;
}
.mb-2 {
  margin-bottom: 2rem;
}

.security-risk {
  grid-area: security-risk;
  padding: 1rem 2rem 2rem;
}

.operation-process {
  grid-area: operation-process;
  padding: 0 2rem;
  box-sizing: border-box;
  .left-bottom {
    height: 100%;
  }
}

.hidden-treatment {
  grid-area: hidden-treatment;
  padding: 1rem 2rem 2rem;
  box-sizing: border-box;
}

.hidden-type {
  grid-area: hidden-type;
  padding: 0 2rem;
}

.middle {
  grid-area: middle;
  text-align: center;
  margin-top: 1rem;
  height: 100%;
}

.middle .lable {
  color: white;
  border: 0.2rem solid grey;
  background-color: rgba(128, 128, 128, 0.5);
  width: 16rem;
  font-size: 2.4rem;
  box-sizing: border-box;
  border-radius: 50rem;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}

.middle .num {
  color: red;
  margin: 0 1rem;
}

.middle .title {
  color: white;
  width: 90%;
  font-size: 2.4rem;
  margin-left: 2rem;
  text-align: right;
  margin-bottom: 2rem;
  border-left: 0.6rem solid red;
  height:3rem;
}

.middle .top {
  display: flex;
  justify-content: space-around;
  height: 5rem;
}
.middle .bottom{
   height: calc(100% - 7rem);
}

.right-top {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.border {
  background-color: black;
}

.img {
  display: inline-block;
  width: 50rem;
}

.icon-map {
  width: 100%;
  height: 40vh;
}
:deep(.dv-full-screen-container) {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
:deep(.dv-border-box-9) {
  width: 100%;
  height: 100vh;
}

:deep(.dv-border-box-12) {
  padding-top: 2rem;
}

:deep(.dv-active-ring-chart) {
  margin-top: 4rem;
}

:deep(.dv-capsule-chart) {
  margin-left: 2rem;
}

:deep(.dv-conical-column-chart) {
  margin-left: 4rem;
  margin-top: 8rem;
}

.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
