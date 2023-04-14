<template>
<div class="main">
  <!-- 这是layout -->
    <div class="head">
      <HeadNav defaultTitle="园区信息管理"></HeadNav>
    </div>
    <div class="router">
      <router-view></router-view>
    </div>
</div>
</template>

<script lang="ts" setup>
import HeadNav from "../../../../components/top-nav/HeadNav.vue";
</script>

<style scoped>
.router{
  height: calc(100vh - 6rem);
}
.head{
  position: absolute;
    top: 0;
    z-index: 999;
    width: 100%;
}
</style>
