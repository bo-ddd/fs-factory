<template>
  <dv-border-box-9 class="border">
    <div class="box">
      <div class="security-risk">
        <dv-border-box-11 title="安全风险监管">
          <div class="flex left-top">
            <!-- <dv-active-ring-chart :config="cake" style="width:15rem;height:15rem;" /> -->
            <!-- <dv-active-ring-chart :config="cake" style="width:15rem;height:15rem;" /> -->
            <!-- <dv-active-ring-chart :config="cake" style="width:15rem;height:15rem;" /> -->
          </div>
          <!-- <dv-capsule-chart :config="config" style="width:50rem;height:20rem" /> -->
        </dv-border-box-11>
      </div>
      <div class="operation-process">
        <dv-border-box-11 title="安全走势图">
          <div class="flex left-bottom">
            <Line-chart></Line-chart>
          </div>
        </dv-border-box-11>
      </div>
      <div class="middle">
        <dv-border-box-12 class="flex-col">
          <p class="title">风险分布</p>
          <div class="top">
            <!-- <p class="lable">风险<span class="num">10</span>处</p> -->
            <p class="lable">隐患<span class="num">10</span>处</p>
          </div>
          <Histogram></Histogram>
          <div class="img">
            <img class="icon-map" src="https://unier.oss-cn-beijing.aliyuncs.com/industry/images/map.png" alt="" />
          </div>
        </dv-border-box-12>
      </div>
      <div class="hidden-treatment">
        <dv-border-box-11 title="隐患排查治理">
          <div class="right right-top">
            <!-- <dv-scroll-board :config="row" style="width:55rem;height:28rem" /> -->
          </div>
        </dv-border-box-11>
      </div>
      <div class="hidden-type">
        <dv-border-box-11 title="隐患类型">
          <div class="right flex right-bottom">
            <!-- <dv-conical-column-chart :config="column" style="width:50rem;height:30rem;" /> -->
          </div>
        </dv-border-box-11>
      </div>
    </div>
  </dv-border-box-9>
</template>
<script setup lang="ts">
</script>
<style scoped>
.box {
  background: url("../../assets/images/bg.gif");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: grid;
  height: 100vh;
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
}

.hidden-treatment {
  grid-area: hidden-treatment;
  padding: 1rem 2rem 2rem;
}

.hidden-type {
  grid-area: hidden-type;
  padding: 0 2rem;
}

.middle {
  grid-area: middle;
  text-align: center;
  margin-top: 1rem;
  height: calc(100vh - 10rem);
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
}

.middle .top {
  display: flex;
  justify-content: space-around;
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
