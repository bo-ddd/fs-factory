<template>
  <div class="main">
    <dv-border-box-1 :color="['#245970','bule']">
      <div class="title">
        <div class="fs-3 cl-white pd-2">浮山双新园区智能管控</div>
        <dv-decoration-5 class="dv-5" dur="2" style="width:80rem;height:10rem;" />
      </div>
      <div class="box-login">
        <dv-border-box-13 class="dv-login">
          <dv-border-box-8 :reverse="true">
            <div>
              <div class="login">登录</div>
              <dv-decoration-8 class="dv-8" style="width:30rem;height:5rem;" />
            </div>
            <div class="box-inp">
              <div class="box">
                <div class="mr-2 cl-white">账户</div>
                <input class="inp" type="text" value="Admin" />
              </div>
              <div class="box">
                <div class="mr-2 cl-white">密码</div>
                <input class="inp" type="password" value />
              </div>
            </div>
            <div class="btn" @click="toPage()">
              <dv-decoration-9 style="width:10rem;height:10rem;">进入</dv-decoration-9>
            </div>
          </dv-border-box-8>
        </dv-border-box-13>
      </div>
    </dv-border-box-1>
  </div>
</template>

<script setup lang="ts">
import {
  BorderBox1 as DvBorderBox1,
  BorderBox8 as DvBorderBox8,
  BorderBox13 as DvBorderBox13,
  Decoration5 as DvDecoration5,
  Decoration8 as DvDecoration8,
  Decoration9 as DvDecoration9
} from "@kjgl77/datav-vue3"
import { useRouter } from "vue-router"
const router = useRouter()

const toPage = function () {
  router.push("layout")
}
</script>

<style scoped>
.box {
  width: 40rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
}
.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.dv-5 {
  position: absolute;
  top: 20%;
}
.main {
  width: 100vw;
  height: 100vh;
  background-image: url("https://unier.oss-cn-beijing.aliyuncs.com/industry/images/xk2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #2e77f8;
}
.mt-1 {
  margin-top: 1rem;
}
.mr-2 {
  margin-right: 2rem;
}

.box-login {
  width: 60rem;
  height: 45rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box-inp {
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  top: 20%;
  left: 16%;
}

.dv-box {
  width: 100%;
  position: relative;
}

.dv-login {
  box-sizing: border-box;
  padding: 2rem;
}

.login {
  display: flex;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
  padding-top: 1rem;
}

.dv-8 {
  position: absolute;
  top: 8%;
  left: 22%;
}
.cl-white {
  color: white;
}
.fs-3 {
  font-size: 3rem;
}
.inp {
  font-size: 2rem;
  text-indent: 2em;
  color: white;
  width: 30rem;
  height: 4rem;
  background: none;
  outline: none;
  border-bottom: 1px solid #ccc;
}
.pd-2 {
  padding: 2rem;
}
.btn {
  color: white;
  font-size: 2rem;
  position: absolute;
  top: 70%;
  left: 41.5%;
}
</style>
