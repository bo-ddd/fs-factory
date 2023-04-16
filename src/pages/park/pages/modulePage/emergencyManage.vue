<script setup lang="ts">
import { BorderBox10 } from '@kjgl77/datav-vue3';
import { onMounted } from "vue"
import * as echarts from "echarts"
import history from "../../../../components/table/history.vue"
import shape from "../../../../components/table/shape.vue"
import duty from "../../../../components/table/duty.vue"
// import AMapLoader from "@amap/amap-jsapi-loader"

// const aMap = () => {
//   return AMapLoader.load({
//     key: "9a08b1085292817f6ca0f8aede5e1e44", // 申请好的Web端开发者Key，首次调用 load 时必填
//     version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
//     plugins: ["AMap.DistrictSearch", "AMap.Weather", "AMap.Geocoder", "AMap.Marker"],
//     Loca: {
//       // 是否加载 Loca， 缺省不加载
//       version: "2.0.0" // Loca 版本，缺省 1.3.2
//     }
//   })
// }

// async function mapInit() {
//   await aMap()
//     .then((AMap) => {
//       const map = new AMap.Map("map", {
//         center: [111.8478, 36.02333333333333],
//         zoom: 15,
//         pitch: 40,
//         mapStyle: "amap://styles/blue",
//         viewMode: "3D",
//         showMarker: true,
//         showCircle: true,
//         panToLocation: true,
//         zoomToAccuracy: true
//       })
//       const markerContent =
//         "" + '<div class="custom-content-marker">' + '  <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' + "</div>"
//       const marker = new AMap.Marker({
//         position: [111.8478, 36.02333333333333],
//         // 将 html 传给 content
//         content: markerContent,
//         // 以 icon 的 [center bottom] 为原点
//         offset: new AMap.Pixel(-13, -30)
//       })
//       map.add(marker)
//     })
//     .catch((e) => {
//       console.log(e)
//     })
// }

const init = function () {
  const charDom = document.getElementsByClassName("troops")[0] as HTMLElement
  const myChart = echarts.init(charDom)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "应急救援队伍统计",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 10, name: "搜索" },
          { value: 14, name: "救援" },
          { value: 8, name: "医疗" },
          { value: 6, name: "技术人员" }
        ]
      }
    ]
  }
  option && myChart.setOption(option)
  window.addEventListener("resize", function () {
    myChart.resize()
  })
}
const articleInit = function () {
  const charDom2 = document.getElementsByClassName("article")[0] as HTMLElement
  const myChart2 = echarts.init(charDom2)

  const option2: echarts.EChartsOption = {
    tooltip: {
      trigger: "item"
    },
    textStyle: {
      color: "#fff",
      fontSize: "12"
    },
    legend: {
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: "12"
      }
    },
    grid: {
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: 40
      },
      data: ["应急灯具", "空气呼吸器", "避难衣", "应急输液器", "发电机", "燃气灶", "水桶"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar"
      }
    ]
  }
  option2 && myChart2.setOption(option2)
  window.addEventListener("resize", function () {
    myChart2.resize()
  })
}
const proruptionInit = function () {
  const charDom3 = document.getElementsByClassName("proruption")[0] as HTMLElement
  const myChart3 = echarts.init(charDom3)

  const option3: echarts.EChartsOption = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      left: "center",
      textStyle: {
        color: "#fff",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "突发事件占比统计",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 3, name: "罢工" },
          { value: 1, name: "自然灾害" },
          { value: 8, name: "化学药品泄露" },
          { value: 15, name: "设备故障" }
        ]
      }
    ]
  }
  option3 && myChart3.setOption(option3)
  window.addEventListener("resize", function () {
    myChart3.resize()
  })
}
const maps = function () {
  const charDom4 = document.getElementsByClassName("map")[0] as HTMLElement
  const myChart4 = echarts.init(charDom4);
  let option4;

  option4 = {
    title: {
      text: '应急事件处理',
      left: 'center',
      textStyle:{
        color:'#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle:{
        color:'#fff'
      },
      top:'5%'
    },
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 20, name: '火灾应急演练' },
          { value: 10, name: '网络攻击演练' },
          { value: 15, name: '公共卫生事件演练' },
          { value: 25, name: '停电演练' },
          { value: 10, name: '事故演练' },
          { value: 5, name: '地震演练' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option4 && myChart4.setOption(option4);
}
onMounted(() => {
  init()
  articleInit()
  proruptionInit()
  // mapInit()
  maps()
})
</script>

<template>
  <div class="home-view">
    <div class="troops-box">
      <BorderBox10 style="width: 100%;height: 100%;">
        <div class="grid-title">应急救援队伍统计</div>
        <div class="troops" style="width: 100%;height:  calc(100% - 4rem);"></div>
      </BorderBox10>
    </div>
    <div class="article-box">
      <BorderBox10>
        <div class="grid-title">应急物资统计</div>
        <div class="article" style="width: 100%;height:  calc(100% - 4rem);"></div>
      </BorderBox10>
    </div>
    <div class="left3">
      <BorderBox10>
        <div class="grid-title">历史应急演练记录表</div>
        <history></history>

      </BorderBox10>
    </div>
    <div class="map" id="map">
      <BorderBox10>
      </BorderBox10>
    </div>
    <div class="history">
      <BorderBox10>
        <div class="grid-title">应急事件处理情况</div>
        <shape></shape>
      </BorderBox10>
    </div>
    <div class="proruption-box">
      <BorderBox10>
        <div class="grid-title">突发事件占比统计</div>
        <div class="proruption" style="width: 100%;height:  calc(100% - 4rem);"></div>
      </BorderBox10>
    </div>
    <div class="right3">
      <BorderBox10>
        <div class="grid-title">值班人员列表</div>
        <duty></duty>
      </BorderBox10>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-view {
  height: 100vh;
  padding: 6rem 1rem 1rem 1rem;
  box-sizing: border-box;
  background: url(https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif) no-repeat;
  background-size: cover;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2fr 3fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "left1 main right1"
    "left2 main right2"
    "left3 main right3";
  color: #fff;
  font-size: 2rem;
  text-align: center;

  .troops-box {
    grid-area: left1;
  }

  .article-box {
    grid-area: left2;
  }

  .left3 {
    grid-area: left3;
  }

  .map {
    grid-area: main;
  }

  .history {
    grid-area: right1;
  }

  .proruption-box {
    grid-area: right2;
  }

  .right3 {
    grid-area: right3;
  }
}

.grid-title {
  font-size: 2rem;
  height: 4rem;
  line-height: 4rem;
}
:deep(.dv-scroll-board .rows .ceil) {
    padding: 0;
    background-color: #01c0d500 !important;
    white-space: normal !important;
    color: #01c0d5;
}

:deep(.dv-scroll-board .header) {
    background-color: #01c0d500 !important;
    font-weight: 600;
    color: #01c0d5;
}
</style>
