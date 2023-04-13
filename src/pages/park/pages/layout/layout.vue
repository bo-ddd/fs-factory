<template>
<div class="main">
  <!-- 这是layout -->
    <HeadNav></HeadNav>
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
</style>
