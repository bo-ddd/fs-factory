<template>
  <div class="analysis" title="提示：单击按钮激活对应功能,在地图上单击开始，绘制中单击增加点、双击结束。">
    <div class="analysis-tool" v-for="(item, index) in htmlDataArr" :key="index" @click="goAnalysisOtherView(item.viewName)">
      <div class="analysis-tool-thum" :style="item.style">
        <img class="analysis-tool-thum_img" :src="item.img" :alt="item.name" />
      </div>
      <span> {{ item.name }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import rzfx from "./img/rzfx.svg"
import ksy from "./img/ksy.svg"
import flfx from "./img/flfx.svg"
import dxkw from "./img/dxkw.svg"
import dbtm from "./img/dbtm.svg"
import pdpx from "./img/pdpx.svg"
import mxpq from "./img/mxpq.svg"
import mxyp from "./img/mxyp.svg"
import mxcj from "./img/mxcj.svg"

const htmlDataArr = [
  {
    name: "日照分析",
    style: "background: #dd751b",
    img: rzfx,
    viewName: "sunlight"
  },
  {
    name: "可视域",
    style: "background: #c092fe",
    img: ksy,
    viewName: "visible"
  },
  {
    name: "方量分析",
    style: "background: #88b8ff",
    img: flfx,
    viewName: "volume"
  },
  {
    name: "地形开挖",
    style: "background: #3de3f4",
    img: dxkw,
    viewName: "terrainClip"
  },
  {
    name: "地表透明",
    style: "background: #c092fe",
    img: dbtm,
    viewName: "terrainOpacity"
  },
  {
    name: "坡度坡向",
    style: "background: #95d333",
    img: pdpx,
    viewName: "terrainSlope"
  },
  {
    name: "模型剖切",
    style: "background: #55d5a0",
    img: mxpq,
    viewName: "modelClip"
  },
  {
    name: "模型压平",
    style: "background: #37bc41",
    img: mxyp,
    viewName: "modelFlat"
  },
  {
    name: "限高分析",
    style: "background: #babc31",
    img: mxcj,
    viewName: "modelLimitHeight"
  }
]

const emit = defineEmits(["goAnalysisOtherView"])

function goAnalysisOtherView(name: string) {
  emit("goAnalysisOtherView", name)
}
</script>
<style scoped lang="less">
.analysis {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.analysis-tool {
  cursor: pointer;
  user-select: none;
  height: 96px;
  box-sizing: border-box;
  margin: 0 15px 10px 15px;
  text-align: center;
  padding-top: 12px;
}
.analysis-tool-thum {
  transition: all 0.2s ease;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  margin-bottom: 10px;
  background: #fd960f;
  cursor: pointer;
  .analysis-tool-thum_img {
    width: 24px;
    height: 24px;
    margin: 13px;
  }
}
</style>
