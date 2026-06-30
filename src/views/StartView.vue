<template>

  <div class="container">

    <!-- 共通ヘッダー枠（他ページと統一） -->
    <div class="header-buttons"></div>

      <!-- タイトル -->
      <h1 class="title">
        <span class="chunk">ようこそ　占いの</span>
        <span class="chunk">ハウスへ</span>
      </h1>

      <!-- 背景 -->
      <div class="wood"></div>


      <!--  ログイン -->
      <button class="login-btn" @click="goLogin">
        ログイン
      </button>

      <!--  新規登録 -->
      <button class="signup-btn" @click="goSignup">
        新規会員登録
      </button>

  </div>

  <p class="credit">
    Image Credit: NASA
  </p>


</template>


<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}

const goSignup = () => {
  router.push('/signup')
}

</script>


<style scoped>

  /* 全体 */
  .container {
    text-align: center;

    height: 100vh;
    width: 100vw;

    background-image: url('/src/assets/Perseids1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    overflow: hidden;
  }


  /* ヘッダー */
  .header-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto 20px;
  }

  /* タイトル */
  .title {
    font-size: 4rem;
    margin: 40px auto 40px;  /* ←80 → 40 に変更 */
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;

    text-shadow:
      0 0 3px #fff,
      0 0 6px #fff,
      0 0 8px #fff,
      0 0 12px #fff;

    position: relative;
    z-index: 2;
  }

  /* ボタン */
  button {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 20px auto;  /* ←50 → 20 */
    padding: 12px;
    font-size: 1.5rem;
    border-radius: 6px;
  }

  .login-btn {
    margin-top: 10px;
  }

  .signup-btn {
    margin-top: 10px;
  }

  /* 木材 */
  .wood {
    background-image: url('/src/assets/mokuzai1.png');
    background-size: cover;
    background-position: center;

    width: 100%;
    max-width: 740px;
    height: 140px;

    margin: 20px auto 60px;
    margin-top: -150px;
    border-radius: 8px;

    z-index: 1;
  }

  /* クレジット */
  .credit {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
  
</style>