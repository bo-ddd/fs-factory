<template>
  <div class="title-box">

    <button>{{ title }}</button>
  </div>
</template>
<style lang="scss" scoped>

button {
  --glow-color: rgb(217, 176, 255);
  --glow-spread-color: rgba(191, 123, 255, 0.781);
  --enhanced-glow-color: rgb(231, 206, 255);
  --btn-color: rgb(100, 61, 136);
  border: 0.25em solid var(--glow-color);
  padding: 1rem 3rem;
  color: var(--glow-color);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--btn-color);
  border-radius: 1rem;
  outline: none;
  box-shadow: 0 0 1rem 0.25rem var(--glow-color), 0 0 4rem 1rem var(--glow-spread-color),
    inset 0 0 0.75rem 0.25rem var(--glow-color);
  text-shadow: 0 0 0.5rem var(--glow-color);
  position: relative;
  transition: all 0.3s;
}

button::after {
  pointer-events: none;
  content: '';
  position: absolute;
  top: 120%;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--glow-spread-color);
  filter: blur(2rem);
  opacity: 0.7;
  transform: perspective(1.5rem) rotateX(35deg) scale(1, 0.6);
}

button:hover {
  color: var(--btn-color);
  background-color: var(--glow-color);
  box-shadow: 0 0 1rem 0.25rem var(--glow-color), 0 0 4rem 2rem var(--glow-spread-color),
    inset 0 0 0.75rem 0.25rem var(--glow-color);
}

button:active {
  box-shadow: 0 0 0.6rem 0.25rem var(--glow-color), 0 0 2.5rem 2rem var(--glow-spread-color),
    inset 0 0 0.5rem 0.25rem var(--glow-color);
}

</style>
<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
const props = defineProps<{ title?: string }>();
const { title } = toRefs(props);
</script>
