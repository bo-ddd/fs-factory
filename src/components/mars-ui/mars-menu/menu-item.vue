<template>
  <div class="mars-menu-item">
    <span class="mars-menu-icon" v-if="slots.icon">
      <slot name="icon"></slot>
    </span>
    <span class="mars-menu-text">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue"

const slots = useSlots()
</script>

<style scoped lang="less"></style>
