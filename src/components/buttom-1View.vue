<template>
  <div class="title-box">
    <button>
      <span></span>
      <span></span>
      <span></span>
      <span></span>{{ title }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
/* From www.lingdaima.com */
button {

  position: relative;
  padding: 1.5rem 1.8rem;
  outline: none;
  border: 0.1rem solid #303030;
  background: #212121;
  color: #ae00ff;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 1.5rem;
  overflow: hidden;
  transition: 0.2s;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  box-shadow: 0 0 1rem #ae00ff, 0 0 2.5rem #001eff, 0 0 5rem #ae00ff;
  transition-delay: 0.6s;
}

button span {
  position: absolute;
}

button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 0.2rem;
  background: linear-gradient(90deg, transparent, #ae00ff);
}

button:hover span:nth-child(1) {
  left: 100%;
  transition: 0.7s;
}

button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 0.2rem;
  background: linear-gradient(90deg, transparent, #001eff);
}

button:hover span:nth-child(3) {
  right: 100%;
  transition: 0.7s;
  transition-delay: 0.35s;
}

button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 0.2rem;
  height: 100%;
  background: linear-gradient(180deg, transparent, #ae00ff);
}

button:hover span:nth-child(2) {
  top: 100%;
  transition: 0.7s;
  transition-delay: 0.17s;
}

button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 0.2rem;
  height: 100%;
  background: linear-gradient(360deg, transparent, #001eff);
}

button:hover span:nth-child(4) {
  bottom: 100%;
  transition: 0.7s;
  transition-delay: 0.52s;
}

button:active {
  background: #ae00af;
  background: linear-gradient(to top right, #ae00af, #001eff);
  color: #bfbfbf;
  box-shadow: 0 0 8rem #ae00ff, 0 0 8rem #001eff, 0 0 8rem #ae00ff;
  transition: 0.1s;
}

button:active span:nth-child(1) span:nth-child(2) span:nth-child(2) span:nth-child(2) {
  transition: none;
  transition-delay: none;
}
</style>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps<{ title?: string }>();
const { title } = toRefs(props);
</script>
