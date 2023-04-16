<template>
  <div class="view">
    <el-page-header class="pb-2 jump" @back="goBack" title="返回" content="卡口监控"></el-page-header>
    <video-pages></video-pages>
  </div>
</template>
  
<script>
import videoPages from "@mars/components/lxs/videoPages.vue"
export default {
  components: { videoPages },
  name: "lxsFsFormwork1",
  data() {
    return {
      isView: false,
      showView: true,
      videoList: [],
      videoInstance: null
    }
  },
  methods: {
    goBack() {
      this.$router.push("vehicleMonitoring")
    },
    // 添加选中状态
    cheage(id, data) {
      data.forEach((element) => {
        element.isActive = false
        // eslint-disable-next-line eqeqeq
        if (element.id == id) {
          element.isActive = true
        }
      })
    }
  }
}
</script>
  
<style scoped lang="scss">
.loader {
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "ZCODL Kuaile", cursive;
  font-size: 10rem;
  color: palevioletred;
  background-image: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
  background-repeat: no-repeat;
  background-size: cover;
}

.loader::after {
  content: "\2026";
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  animation: dots steps(4, end) 2s infinite;
  width: 0px;
}

@keyframes dots {
  to {
    width: 1.25em;
  }
}

.view {
  width: 100%;
  height: 100%;
  padding-top: 6rem;
  box-sizing: border-box;
  background-image: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
  background-repeat: no-repeat;
  background-size: cover;
}

.mb-1 {
  margin-bottom: 1rem !important;
}

.view {
  position: relative;
}

.lxs-fs-webcam {
  width: 100vw;
  height: calc(100vh - 13rem);
  color: #fff;
  display: flex;
  box-sizing: border-box;
  padding: 0.5rem;
  gap: 0.5rem;
}

.lxs-fs-webcam .left {
  flex: 0 1 80%;
}

.lxs-fs-webcam .left .lxs-main_body {
  height: 100%;
  box-sizing: border-box;
}

.lxs-fs-webcam .left .lxs-main_body .video-js {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  margin: 0 !important;
}

.lxs-fs-webcam .left .lxs-main_body-bottom {
  height: calc(5% - 0.5rem);
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 1rem;
}

.lxs-fs-webcam .right {
  flex: 0 1 20%;
  box-sizing: border-box;
  animation: dynamicBorder 5s infinite linear;
}

.lxs-fs-webcam .right .lxs-nav {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // padding: .5rem;
  border-radius: 1rem;
}

.lxs-fs-webcam .right .lxs-nav .item {
  width: 100%;
  height: calc(100% / 3.1);
  border-radius: 1rem;
  box-sizing: border-box;
}

.reminder_alarm {
  width: 100%;
  height: 100%;
  color: #000;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    font-size: 1.8rem;
    padding: 0.5rem 0;
    color: #ffffff;
    box-sizing: border-box;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .alert {
    width: 98%;
    height: calc(100% - 2rem);
    margin: auto;
    overflow: scroll;
    padding: 1rem 0;
    box-sizing: border-box;

    .over_scroll_item {
      width: 98%;
      margin: 0 auto;
      border-radius: 1rem;
      padding: 1rem 2rem;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      position: relative;

      .img {
        width: 5rem;
        border-radius: 1rem;
        background-color: #ccc;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 3rem;
          height: 3rem;
        }
      }

      .over_scroll_item-title {
        font-size: 1.6rem;
      }

      .text {
        font-size: 1.2rem;
        color: #999999;
      }

      .date {
        color: #999;
      }
    }
  }
}

.lxs-fs-webcam .right .lxs-nav .item .video-js {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
  border-radius: 1rem;
}

.mb-05 {
  margin-bottom: 0.5rem;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-lie-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.view2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0.5rem;
  background-color: #060d25;
  color: #fff;
  box-sizing: border-box;
}

.view2 .view2-box {
  padding: 0.8rem;
  box-sizing: border-box;
}

.view2 .view2-box-flex {
  width: 100%;
  max-width: 260rem;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template: repeat(3, auto) / repeat(3, auto);
  grid-gap: 2rem;
  justify-content: center;
}

.view2 .view2-box .item {
  width: 60rem;
  height: 50rem;
  box-sizing: border-box;
}

.view2 .view2-box .item .video-js {
  width: 100%;
  height: 100%;
}

.jump {
  color: #fff;
  padding: 2rem 0 2rem 0.5rem;
  box-sizing: border-box;
}
:deep(.el-page-header__content) {
  color: #fff !important;
}
:deep(.el-page-header__back):hover {
  color: #02e4f2;
}
</style>
