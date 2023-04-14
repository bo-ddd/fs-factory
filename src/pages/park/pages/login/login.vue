<template>
  <div class="login flex_al_ju-center">
    <div id="animationTab" class="login_form animation1" @webkitAnimationEnd="login_animation()">
      <el-form class="form" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="sadsad" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pswd" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// 登录的from表单加载动画
function login_animation(): void {
  const dom: any = document.getElementById('animationTab');
  dom.classList.remove('animation1');
  dom.classList.add('animation2');
}

const form = reactive({
  name: '',
  pswd: '',
})

const onSubmit = () => {
  console.log('submit!')
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
    overflow: hidden;
  }
}

.animation1 {
  animation: slitherDynamicBorder .5s linear;
}

.animation2 {
  animation: dynamicBorder 1s infinite linear;
}

@keyframes slitherDynamicBorder {
  0% {
    height: 0;
    border: .2rem solid #7700ff;
  }

  40% {
    border: .2rem solid #874ed1;
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
