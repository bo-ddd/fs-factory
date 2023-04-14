<template>
    <div class="video_page">
        <video-page :lxsData="sss" />
    </div>
</template>

<script setup lang="ts">
let sss: any = {
    type: 1,
}
</script>

<style lang="scss" scoped>
.video_page {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 6rem;
    background-image: url('https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
