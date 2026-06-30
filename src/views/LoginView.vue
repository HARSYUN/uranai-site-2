<template>

  <div class="container">

    <!-- 共通ボタンエリア -->
    <div class="header-buttons">
      <button type="button" class="back-btn" @click="goBack">
        前のページに戻る
      </button>
    </div>

    <!-- タイトル統一 -->
    <h1 class="main-title">占いのハウス</h1>
    <h2 class="sub-title">会員ログイン</h2>

    <div class="wood"></div>

      <div class="form-area">
    <label>メールアドレス</label>
    <input v-model="email" />

    <label>パスワード</label>
    <input type="password" v-model="password" />

    <p v-if="errorMessage" class="error">
      メールアドレスまたはパスワードが間違っています
    </p>

    <button type="button" @click="login">
      ログイン
    </button>

  </div>

  </div>

  <p class="credit">
    Image Credit: NASA <br>
    窓枠画像: AI生成
  </p>

</template>


<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref(false)

const goBack = () => {
  router.push('/')
}

const login = async () => {

  if (email.value === '' || password.value === '') {
    errorMessage.value = true
    return
  }

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (!res.ok) {
      throw new Error('通信エラー')
    }

    const data = await res.json()

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user))
      errorMessage.value = false
      router.push('/main')
    } else {
      errorMessage.value = true
    }

  } catch (e) {
    console.error(e)
    errorMessage.value = true
  }
}

</script>



<style scoped>

  /* 全体 */
  .container {
    text-align: center;

    height: 100vh;
    width: 100vw;

    background-image: url('/src/assets/Lyrid1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    overflow: hidden;
  }

  /* ボタン共通 */
  .header-buttons {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 10px auto;
  }


  /* ボタン */
  button {
    display: block;
    width: 100%;
    max-width: 300px;
    margin: 30px auto;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 6px;
  }

  /* 戻るボタン */
  .back-btn {
    width: auto;
    max-width: none; 
    margin-right: 15%; 
  }

  .wood {
    background-image: url('/src/assets/mokuzai1.png');  /* ←変更 */
    background-size: cover;
    background-position: center;

    width: 100%;
    max-width: 640px;
    height: 500px;

    margin: -170px auto 60px;  /* Startと同じ動き */
    border-radius: 8px;

    position: static;
    z-index: 1;
  }


  /* タイトル */
  .main-title {
    position: relative;
    top: 60px;
    font-size: 4rem;
    margin-bottom: 50px;
  }

  .sub-title {
    position: relative;
     top: 60px;
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 40px;
  }

  label {
    color: #000;
    font-weight: bold;
  }

  .form-area {
    position: relative;
    top: -350px;
    z-index: 2;
  }


  /* 入力 */
  input {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
    color: #000;
  }

  .main-title,
  .sub-title,
  label,
  input,
  button,
  .error {
    z-index: 2;
  }



  /* エラー */
  .error {
    color: red;
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