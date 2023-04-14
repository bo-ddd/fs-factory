<template>
  <div class="border">
    <div class="box">
      <div class="title"></div>
      <div class="security-risk">
        <BorderBox11 title="安全系数评估" class="datav">
          <div class="box-item flex-column">
            <CapsuleChart :config="config" class="safeRate" />
          </div>
        </BorderBox11>
      </div>
      <div class="operation-process">
        <BorderBox11 title="安全运行天数" class="datav">
          <div class="box-item">
              <LineChart></LineChart>          
          </div>
        </BorderBox11>
      </div>
      <div class="middle">
        <BorderBox11 title="风险分布" class="datav" >
          <div class="box-item flex-column">
            <!-- <div class="top">
              <p class="lable">风险<span class="num">0</span>处</p>
              <p class="lable">隐患<span class="num">0</span>处</p>
            </div> -->
            <div class="bottom">
              <Histogram class="abc" />
            </div>
          </div>
        </BorderBox11>
      </div>
      <div class="hidden-treatment">
        <BorderBox11 title="隐患排查治理" class="datav">
          <div class=" flex-center" style="width: 100%; height: 100%; padding: 0 2rem; box-sizing: border-box;">

            <ScrollBoard :config="row" style="width: 100%; height: 100%" />

          </div>
        </BorderBox11>
      </div>
      <div class="hidden-type">
        <BorderBox11 title="隐患类型" class="datav">   
          <div style="width: 100%; height: 100%; padding: 2rem; box-sizing: border-box;">

            <ConicalColumnChart :config="column" style="width: 100%; height: 100%; " />
          </div>

        </BorderBox11>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import { BorderBox11, ConicalColumnChart, ScrollBoard, CapsuleChart } from '@kjgl77/datav-vue3'
import LineChart from '../../../../components/HiddenTrouble/HiddenLineChart/HiddenLineChart.vue'
import Histogram from '../../../../components/HiddenTrouble/HiddenHistogram/HiddenHistogram.vue'
const config = reactive({
  //   radius: "50%",
  //   activeRadius: "60%",
  data: [
    {
      name: "生产设备",
      value: 80
    },
    {
      name: "生产状况",
      value: 88
    },
    {
      name: "经济状况",
      value: 99
    },
    {
      name: "应急资源",
      value: 80
    },
    {
      name: "公共设施",
      value: 89
    },
    {
      name: "环境质量",
      value: 87
    },
    {
      name: "运输状况",
      value: 100
    },
  ],
  colors: ['#e062ae', '#fb7293', '#e690d1', '#58a6a8', '#99d9c9', '#32c5e5', '#96bfff'],
  showValue: true
  //   digitalFlopStyle: {
  //     fontSize: 20
  //   },
  //   showOriginValue: true,
  //   lineWidth: 10
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
      value: 2
    },
    {
      name: "气体泄露",
      value: 1
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
      value: 2
    }
  ],
  showValue: true
})
const row = reactive({
  header: ["隐患", "是否处理", "安全负责人"],
  data: [
    ["火灾", "已处理", "范卫明"],
    ["气体泄露", "已处理", "田野"],
    ["液体泄漏", "已处理", "寇仲"],
    ["工程车", "已处理", "李浮生"],
    ["辐射物质", "已处理", "李爱朱"],
    ["设施设备", "已处理", "赵海岭"],
    ["储存区", "已处理", "赵宇"],
    ["静电", "已处理", "李建"],
    ["现场安全", "已处理", "何悦"],
    ["生产", "已处理", "马术"]
  ],
  index: true,
  columnWidth: [50],
  align: ["center", "center", "center", "center"],
  oddRowBGC: 'none',
  evenRowBGC: 'none'
})
const enviroment = reactive({
  value: 66,
  borderWidth: 5,
  borderRadius: 10,
  borderGap: 5
})
</script>
<style scoped lang="scss">
.box {
  background: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100vh;
  display: grid;
  box-sizing: border-box;
  padding: 3rem 1rem;
  grid-template-rows: 6rem 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "title title title"
    "security-risk  middle  hidden-treatment"
    "operation-process  middle  hidden-type";
}

.title {
  grid-area: title;
}

.bottom {
  height: 80%;
}

.mt-2 {
  margin-top: 2rem;
}

.mt-6 {
  margin-top: 6rem;
}

// .flex-center {
//   display: flex;
//   justify-content: center;
// }

.mb-2 {
  margin-bottom: 2rem;
}

.datav {
  width: 100%;
  height: 100%;
  padding-top: 7rem;
  box-sizing: border-box;
}

.security-risk {
  grid-area: security-risk;
}

.operation-process {
  grid-area: operation-process;
  box-sizing: border-box;

  .left-bottom {
    height: 100%;
  }
}

.box-item {
  height: 100%;
  // padding: 7rem 1rem 0 1rem;
  box-sizing: border-box;
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.safeRate {
  width: 90%;
  height: 80%;
}

.left-top {
  height: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.hidden-treatment {
  grid-area: hidden-treatment;
  box-sizing: border-box;
}

.hidden-type {
  grid-area: hidden-type;
}

.middle {
  grid-area: middle;
  text-align: center;
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
  height: 3rem;
}

.middle .top {
  display: flex;
  justify-content: space-around;
  height: 5rem;
}

.right-top {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

// .flex {
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// }

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
:deep(.dv-conical-column-chart){
  margin: 0 !important;
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
}</style>
