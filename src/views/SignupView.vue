<template>

  <div class="container">

    <!-- 共通ボタンエリア -->
    <div class="header-buttons">
      <button type="button" class="back-btn" @click="goBack">
        前のページに戻る
      </button>
    </div>

    <!-- タイトル（共通化） -->
    <h1 class="main-title">占いのハウス</h1>
    <h2 class="sub-title">新規会員登録</h2>

    <div class="wood"></div>

    <label>名前</label>
    <input v-model="name" placeholder="名前を入力してください" />

    <label>メールアドレス</label>
    <input v-model="email" placeholder="メールアドレスを入力してください" />

    <label>パスワード</label>
    <input
      type="password"
      v-model="password"
      placeholder="英数字8桁以上20桁未満"
    />

    <label>パスワード（確認用）</label>
    <input type="password" v-model="confirmPassword" />

    <label>性別</label>
    <select v-model="gender">
      <option value="">未選択</option>
      <option value="男">男</option>
      <option value="女">女</option>
      <option value="その他">その他</option>
    </select>

    <label>生年月日</label>
    <input type="date" v-model="birthdate" />

    <p v-if="passwordError" class="error">
      パスワードが条件を満たしていません
    </p>

    <p v-if="inputError" class="error">
      未入力の情報があります
    </p>

    <button type="button" class="submit-btn" @click="submit"> 
      確認メール送信
    </button>

    </div>


  <p class="credit">
    Image Credit: NASA
  </p>

  </template>


<script setup lang="ts">

  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const gender = ref('')
  const birthdate = ref('')

  const passwordError = ref(false)
  const inputError = ref(false)

  const goBack = () => {
    router.push('/') 
  }


  const submit = async () => {

    passwordError.value = false
    inputError.value = false

    if (
      name.value === '' ||
      email.value === '' ||
      password.value === '' ||
      confirmPassword.value === '' ||
      birthdate.value === '' ||
      gender.value === ''
      )
      {
      inputError.value = true
      return
      }

    //パスワード
    const hasLetter = /[a-zA-Z]/.test(password.value)
    const hasNumber = /[0-9]/.test(password.value)

    if (
        password.value.length < 8 ||
        password.value.length >= 20 ||
        password.value !== confirmPassword.value ||

        !hasLetter || 
        !hasNumber 
      ) 
      {
        passwordError.value = true
        return
      }

    
  try {
      
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            gender: gender.value,
            birthdate: birthdate.value
          })
        })

        const data = await res.json()
        console.log(data)


        router.push('/signup_email')

      } catch (err) {
        console.error(err)
      }
   }

  </script>


<style scoped>

  /* 全ページ統一 */
  .container {
    text-align: center;

    min-height: 100vh;
    width: 100vw; 

    background-image: url('/src/assets/Perseids1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;


  }


  /* 共通ヘッダー */
  .header-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    }

  /* 戻るボタン */
  .back-btn {
    margin-right: 20%; 
  }

  /* タイトル */
  .main-title {
    font-size: 64px;
    margin-top: 70px;
    margin-bottom: 0;

    position: relative;
    z-index: 2;

    text-shadow:
      0 0 3px #fff,
      0 0 6px #fff,
      0 0 8px #fff,
      0 0 12px #fff;
  }


  /* サブタイトル */
  .sub-title {
    font-size: 32px;
    margin-top: 40px;

    position: relative;
    z-index: 2;

    text-shadow:
      0 0 3px #fff,
      0 0 6px #fff,
      0 0 8px #fff,
      0 0 12px #fff;
  }


  label {
    color: #000;
    font-weight: bold;
    text-align: center;
    display: block;
  }

  .main-title,
  .sub-title {
    text-align: center;
  }

  input::placeholder {
    color: #000; 
    opacity: 1; 
  }


  /* 入力 */
  input, select {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 100%; 
    max-width: 300px;
    box-sizing: border-box;
  }

  /* ボタン共通 */
  button {
    display: block;
    width: 100%;
    max-width: 240px;
    margin: 20px auto;
    padding: 12px;
    font-size: 1.2rem;
    border-radius: 6px;
  }

  .submit-btn {
  margin-top: 40px;  
  }


  /* エラー */
  .error {
    color: red;
  }

  .wood {
    background-image: url('/src/assets/mokuzai2.png');
    background-size: cover;
    background-position: center;

    width: 100%;
    max-width: 640px;
    height: 800px;

    margin: -150px auto 60px;
    border-radius: 8px;

    position: static;
    z-index: 1;
  }

  * {
    box-sizing: border-box;
  }


  label,
  input,
  select,
  .error,
  .submit-btn {
    position: relative;
    top: -700px;
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