<template>
    <div class="video_page">
        <video-page v-if="lxsData.type == 1" :lxsData="lxsData" />
    </div>
</template>

<script setup lang="ts">
const lxsData = {
    type: 1,
}
</script>

<style lang="scss" scoped>
.video_page {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 6rem;
    background-image: url('../../assets/images/bg.gif');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
