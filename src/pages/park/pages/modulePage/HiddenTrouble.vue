<template>
  <div class="border">
    <div class="box">
      <div class="title"></div>
      <div class="security-risk">
        <BorderBox11 title="安全系数评估" class="datav">
          <div class="box-item" style="width: 100%; height: 100%; padding: 0 2rem; box-sizing: border-box;">
            <SafeChart class="safe-rate"></SafeChart>
         
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
        <BorderBox11 title="风险分布" >
          <div class="box-item flex-column">
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
        <BorderBox11 title="安全教育培训" class="datav">   
          <div class=" flex-center" style="width: 100%; height: 100%; padding:0 2rem; box-sizing: border-box;">
            <ScrollBoard :config="train" style="width: 100%; height: 100%" />
            <!-- <ConicalColumnChart :config="column" style="width: 100%; height: 100%; " /> -->
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
import SafeChart from '../../../../components/HiddenTrouble/SafetyDay/SafetyDay.vue'
// const config = reactive({
//   //   radius: "50%",
//   //   activeRadius: "60%",
//   data: [
//     {
//       name: "生产设备",
//       value: 80
//     },
//     {
//       name: "生产状况",
//       value: 88
//     },
//     {
//       name: "经济状况",
//       value: 99
//     },
//     {
//       name: "应急资源",
//       value: 80
//     },
//     {
//       name: "公共设施",
//       value: 89
//     },
//     {
//       name: "环境质量",
//       value: 87
//     },
//     {
//       name: "运输状况",
//       value: 100
//     },
//   ],
//   colors: ['#e062ae', '#fb7293', '#e690d1', '#58a6a8', '#99d9c9', '#32c5e5', '#96bfff'],
//   showValue: true
//   //   digitalFlopStyle: {
//   //     fontSize: 20
//   //   },
//   //   showOriginValue: true,
//   //   lineWidth: 10
// })
// const column = reactive({
//   data: [
//     {
//       name: "火灾",
//       value: 30
//     },
//     {
//       name: "气体泄露",
//       value: 40
//     },
//     {
//       name: "辐射",
//       value: 10
//     },
//     {
//       name: "行人安全",
//       value: 10
//     },
//     {
//       name: "失窃",
//       value: 10
//     }
//   ],
//   showValue: true
// })
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

  align: ["center", "center", "center", "center"],
  oddRowBGC: 'none',
  evenRowBGC: 'none'
})
const train = reactive({
  header: ['培训名称', '培训对象', '培训时间', '培训地点', '培训内容', '培训讲师', '培训备注'],
  data: [
    ['化学品安全', '全体员工', '2022-02-28', '化工园区会议室1', '危险化学品分类、标识、管理和应急处置', '高春雷', '无'],
    ['灭火器操作', '消防街道', '2021-11-22', '消防街道', '灭火器使用方法、注意事项、现场演练', '李帅汶', '无'],
    ['应急处置演练', 'D厂房员工', '2021-09-15', 'D厂房1楼办公室', '火灾、瓦斯泄露、化学品泄漏等应急情况的处置方法与流程', '刘义东', '无'],
    ['安全生产法律', '全体员工', '2021-07-23', '化工园区会议室2', '安全生产法律法规、责任、安全文明生产要求等', '任聪聪', '无'],
    ['火灾隐患排查', 'A厂房员工', '2021-06-10', 'A厂房2楼', '火灾隐患排查及预防、消防设备使用和检查、灭火器和消火栓使用方法', '王浩强', '无'],
    ['车间操作安全', 'B厂房员工', '2021-05-06', 'B厂房1楼', '机械设备操作、设备维护保养、操作安全、交通安全', '王洁', '无'],
    ['消防器材讲解', '消防街道', '2021-04-02', '消防街道', '各类消防器材使用以及消防车、喷水、排烟、灭火器的使用方法', '魏庆臣', '无'],
    ['化学品储存', '全体员工', '2021-02-23', '化工园区会议室3', '化学品储存、安全操作、事故预防和应急措施', '许军平', '无'],
    ['安全设施检查', 'C厂房员工', '2020-12-28', 'C厂房3楼', '安全设施的检查、控制阀门的使用、泄漏源的处理方法、低温液体使用以及防护服的佩戴等安全措施', '杨瑞强', '无'],
    ['电气安全操作', '全体员工', '2020-10-15', '化工园区会议室4', '电力安全、电火灾预防措施、电气设备保护和运行、电线电缆使用和安全维护等', '张海康', '无'],
    
  ],
  index: true,
  align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center'],
  oddRowBGC: 'none',
  evenRowBGC: 'none'
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
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-areas:
    "title title title"
    "security-risk   middle  hidden-treatment"
    "operation-process hidden-type hidden-type";
}
.safe-rate {
  width: 90%;
  height: 80%;
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


.mb-2 {
  margin-bottom: 2rem;
}

.datav {
  width: 100%;
  height: 100%;
  padding-top: 6rem ;
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
