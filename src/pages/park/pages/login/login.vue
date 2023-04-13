<template>
  <div class="login flex_al_ju-center">
    <div class="login_form animation1" @webkitAnimationEnd="fn()">

    </div>
  </div>
</template>

<script setup lang="ts">
function fn(): void {
  const dom: any = document.querySelector('.login_form');
  console.log(dom)
  dom.classList.remove('animation1');
  dom.classList.add('animation2')
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/bgd-login.png');
  background-repeat: no-repeat;
  background-size: cover;

  .login_form {
    width: 50rem;
    height: 30rem;
    border: .2rem solid #ccc;
    border-radius: 1rem;
  }
}

.animation1 {
  animation: ceshi .3s linear;
}

.animation2 {
  animation: moveLine 3s infinite linear;
}

@keyframes ceshi {
  0% {
    height: 0;
    border: .2rem solid #7700ff;
  }

  40% {
    border: .2rem solid #6f00ff;
  }

  60% {
    border: .2rem solid #003380;
  }

  100% {
    height: 30rem;
    border: .2rem solid #031cff;
  }
}

.flex_al_ju-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
