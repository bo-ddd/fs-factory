<template>
  <div class="title-box">
    <button>{{ title }}</button>
  </div>
</template>
<style lang="scss" scoped>
button {
 text-decoration: none;
 position: absolute;
 border: none;
 font-size: 1.4rem;
 font-family: inherit;
 color: #fff;
 padding: 1.5rem;
 text-align: center;
 background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
 background-size: 300%;
 border-radius: 1.5rem;
 z-index: 1;
}

button:hover {
 animation: ani 8s linear infinite;
 border: none;
}

@keyframes ani {
 0% {
  background-position: 0%;
 }

 100% {
  background-position: 400%;
 }
}

button:before {
 content: '';
 position: absolute;
 top: -0.5rem;
 left: -0.5rem;
 right: -0.5rem;
 bottom: -0.5rem;
 z-index: -1;
 background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
 background-size: 400%;
 border-radius: 1rem;
 transition: 1s;
}

button:hover::before {
 filter: blur(2rem);
}

button:active {
 background: linear-gradient(32deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
}

</style>
<script lang="ts" setup>
import { defineProps, toRefs } from 'vue'
const props = defineProps<{ title?: string }>()
const { title } = toRefs(props);
</script>
