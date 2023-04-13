<template>
    <div :class="[lxsBoxData.isOpenCartoon ? 'openCartoon' : '', 'box']">
        <div class="header" v-if="lxsBoxData.title">
            <div :style="{ fontSize: lxsBoxData.headerFS, textAlign: lxsBoxData.isCenter }">{{ lxsBoxData.title }}</div>
        </div>
        <div class="container" :style="[lxsBoxData.title ? { height: '90%' } : { height: '100%' }]">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    lxsBoxData
}>()
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border: .2rem solid #003780;
    border-radius: 0rem 2rem;
    box-shadow: inset 0rem 0rem 5rem -1rem #6f88cc;
}

.openCartoon {
    animation: dynamicBorder 5s infinite linear;
}

.header {
    width: 100%;
    box-sizing: border-box;
    padding: .5rem 1rem;
    background-color: rgba(255, 255, 255, 0.2);
}

.container {
    height: 90%;
    box-sizing: border-box;
}
</style>
