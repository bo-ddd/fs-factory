<template>
  <div class="login flex_al_ju-center">
    <div class="login_form">

    </div>
  </div>
</template>

<script setup lang="ts">

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

.flex_al_ju-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
