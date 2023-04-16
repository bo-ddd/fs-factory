<template>
  <div class="views">
    <div class="lxs-fs-webcam" v-show="showView">
      <!-- 摄像头页面 -->
      <div class="left">
        <div class="lxs-main_body">
          <!-- 这里放主要突出的主体摄像头画面 -->
          <lxsBox
            :lxs-box-data="{ isOpenCartoon: true }"
            class="dom"
            style="width: 100%; height: 100%"
          >
            <video id="lxs_myvideo1" class="video-js vjs-fluid vjs-big-play-centered">
              <source src="https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ1C0AF/0/1/20220330T143454/5e7ed935e38989a507d1bfcf0d6016ee.m3u8?proto=https" type="application/x-mpegURL" />
            </video>
          </lxsBox>
        </div>
      </div>
      <div class="right">
        <div class="lxs-nav">
          <!-- 这里放2个其余摄像头画面 和 人员经过的提示 -->
          <div class="flex-lie-center" style="width: 100%; height: 100%">
            <div class="item reminder_alarm">
              <!-- 这里是提示告警 -->
              <div class="title">提示告警</div>
              <div class="alert">
                <div class="over_scroll">
                  <div class="over_scroll_item mb-1">
                    <div class="img">
                      <img
                        src="https://unier.oss-cn-beijing.aliyuncs.com/avatar/%E6%8E%89%E7%BA%BF.png"
                        alt
                      />
                    </div>
                    <div
                      style="color: red; font-size: 2.5rem; position: absolute; top: 0.5rem; left: 8.8rem"
                    >·</div>
                    <div
                      style="margin-left: 1rem; width: calc(100% - 6rem); display: flex; justify-content: space-between"
                    >
                      <div>
                        <div class="over_scroll_item-title mb-05">设备下线</div>
                        <div class="text">C5HC(F22376921)北头</div>
                      </div>
                      <div class="date">06:30</div>
                    </div>
                  </div>
                  <div class="over_scroll_item mb-1">
                    <div class="img">
                      <img
                        src="https://unier.oss-cn-beijing.aliyuncs.com/avatar/%E6%8E%89%E7%BA%BF.png"
                        alt
                      />
                    </div>
                    <div
                      style="color: red; font-size: 2.5rem; position: absolute; top: 0.5rem; left: 8.8rem"
                    >·</div>
                    <div
                      style="margin-left: 1rem; width: calc(100% - 6rem); display: flex; justify-content: space-between"
                    >
                      <div>
                        <div class="over_scroll_item-title mb-05">设备下线</div>
                        <div class="text">C5HC(F22376921)北头</div>
                      </div>
                      <div class="date">06:30</div>
                    </div>
                  </div>

                  <div style="text-align: center; margin-top: 1rem; color: #ccc">没有更多了！</div>
                </div>
              </div>
            </div>
            <div class="item mb-05">
              
          <lxsBox
            :lxs-box-data="{ isOpenCartoon: true }"
            class="dom"
            style="width: 100%; height: 100%"
          >
              <video id="lxs_myvideo2" class="video-js vjs-fluid vjs-big-play-centered">
                <source
                  src="https://cmgw-vpc.lechange.com:8890/LCO/7C0C9D0PAZA5DDA/0/1/20220330T143518/55d0d87f67c0f0225c97aec0b3eb4fa6.m3u8?proto=https"
                  type="application/x-mpegURL"
                />
              </video>
          </lxsBox>
            </div>
            <div class="item mb-05">
              <video id="lxs_myvideo3" class="video-js vjs-fluid vjs-big-play-centered">
                <source
                  src="https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ53814/0/1/20220330T143455/0d365f3d47ca04c359b83b945d5d8162.m3u8?proto=https"
                  type="application/x-mpegURL"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js"
export default {
  name: "lxsFsFormwork1",
  data() {
    return {
      isView: false,
      showView: true,
      video: {
        id: 1,
        isActive: true,
        idName: "lxs_myvideo1",
        url: "https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ1C0AF/0/1/20220330T143454/5e7ed935e38989a507d1bfcf0d6016ee.m3u8?proto=https"
      },
      rightVideo: [
        {
          id: 2,
          isActive: false,
          idName: "lxs_myvideo2",
          url: "https://cmgw-vpc.lechange.com:8890/LCO/7C0C9D0PAZA5DDA/0/1/20220330T143518/55d0d87f67c0f0225c97aec0b3eb4fa6.m3u8?proto=https"
        },
        {
          id: 3,
          isActive: false,
          idName: "lxs_myvideo3",
          url: "https://cmgw-vpc.lechange.com:8890/LCO/7C0C9C9RAZ53814/0/1/20220330T143455/0d365f3d47ca04c359b83b945d5d8162.m3u8?proto=https"
        }
      ],
      videoList: [],
      videoInstance1: null,
      videoInstance2: null,
      videoInstance3: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initVideoDom()
    })
  },
  beforeUnmount() {
    console.log('离开');
    this.videoInstance1.dispose()
    this.videoInstance2.dispose()
    this.videoInstance3.dispose()
  },
  methods: {
    flesh() {
      let isok = window.localStorage.getItem("isFirst")
      if (isok === "abcdefg") {
        this.$router.go(0)
        window.localStorage.setItem("isFirst", "1111")
      } else {
        localStorage.setItem("isFirst", null)
        this.isView = true
      }
    },
    // 初始化video的配置
    initVideo(arr) {
      let init
      // if (id === "lxs_major") {
      init = {
        controls: true, // 是否显示控制条
        preload: "auto",
        autoplay: true,
        fluid: true, // 自适应宽高
        language: "zh-CN", // 设置语言
        muted: true, // 是否静音
        inactivityTimeout: false,
        controlBar: {
          // 设置控制条组件
          /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
          children: [
            { name: "playToggle" }, // 播放按钮
            {
              name: "volumePanel", // 音量控制
              inline: true // 不使用水平方式
            },
            { name: "FullscreenToggle" } // 全屏
          ]
        }
      }
      this.videoInstance1 = videojs(arr[0], init)
      this.videoInstance1.play()
      this.videoInstance2 = videojs(arr[1], init)
      this.videoInstance2.play()
      this.videoInstance3 = videojs(arr[2], init)
      this.videoInstance3.play()
    },
    // 初始化渲染video的dom
    initVideoDom() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.initVideo(["lxs_myvideo1", "lxs_myvideo2", "lxs_myvideo3"])
        })
      }, 200)
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
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "ZCODL Kuaile", cursive;
  font-size: 10rem;
  color: palevioletred;
  z-index: 1;
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

.mb-1 {
  margin-bottom: 1rem !important;
}

.views {
  width: 100%;
  height: calc(100% - 7rem);
  box-sizing: border-box;
  background-image: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
  background-repeat: no-repeat;
  background-size: cover;
}

.lxs-fs-webcam {
  position: absolute;
  z-index: 111;
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
</style>
