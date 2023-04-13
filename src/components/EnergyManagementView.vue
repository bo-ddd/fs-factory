<template>
  <div class="title-box">
    <div class="heteromorphic-box">
      <div class="heteromorphic-b"></div>
      <div class="icon-box">
        <img class="arrowhead" src="../../public/img/parkInfo/arrowhead.png" alt="" />
        <div class="heteromorphic-a">
          <div class="title-size">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    <div class="body-box">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps<{
  title?: string
}>();
// const { title } = props;
</script>

<style lang="scss" scoped>
body {
  .title-box {
    height: 100%;
    margin: 0 auto;
    border-radius: 0.5rem;
    .heteromorphic-box {
      height: 4rem;
      .icon-box {
        display: flex;
        .arrowhead {
          width: 1.5rem;
          height: 1.5rem;
          position: relative;
          top: -0.6rem;
        }
      }
      .heteromorphic-b {
        border-bottom: 0.1rem solid;
        margin-left: 19.6rem;
        border-image: linear-gradient(220deg, rgb(0, 89, 255, 0.2) 0%, #ffffff 80%) 2 2 2 2;
      }
      .heteromorphic-a {
        width: 17rem;
        height: 3.2rem;
        display: flex;
        align-items: center;
        transform: skew(-33deg);
        border-bottom: 0.1rem solid;
        border-right: 0.1rem solid;
        border-image: linear-gradient(100deg, rgb(0, 89, 255, 0.2) 0%, #ffffff 80%) 2 2 2 2;
        background-image: linear-gradient(165deg, rgba(0, 0, 0, 0), rgba(0, 21, 255, 0.3));
        .title-size {
          // margin-bottom: 3.5rem;
          // font-size: 2.5rem;
          margin-bottom: 3rem;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          transform: skew(20deg);
        }
      }
    }
    .body-box{
      height: calc(100% - 4rem);
    }
  }
}
</style>
