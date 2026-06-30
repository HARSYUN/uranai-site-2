<template>
  <div class="container">

  <div class="wood-top"></div>

    <!-- 上に移動 -->
    <div class="header-buttons">


      <!-- 左 -->
      <p class="user">{{ user.name }}様</p>

      <!-- 右 -->
      <div class="right">
        <button class="btn back-btn" @click="goBack">
          前のページへ戻る
        </button>

        <button class="btn logout-btn" @click="logout">
          ログアウト
        </button>
      </div>

  </div>


    <!-- タイトル -->
      <h1 class="main-title">占いのハウス</h1>
      <h2 class="sub-title">マイページ</h2>

    <!-- 下に移動 -->
    <div class="profile">
      <p>名前：{{ user.name }}</p>
      <p>メール：{{ user.email }}</p>
      <p>性別：{{ user.gender }}</p>
      <p>誕生日：{{ user.birthdate }}</p>
      <p>星座：{{ getZodiac(user.birthdate) }}</p>
      <p>運命数：{{ getLifeNumber(user.birthdate) }}</p>
      <p>登録日：{{ formatDate(user.created_at) }}</p>
    </div>

  </div>

  <p class="credit">
    Image Credit: NASA
  </p>

</template>


<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // localStorageからユーザー取得
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // 登録日フォーマット
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''

    const date = new Date(dateStr)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()

    return `${y}/${m}/${d}`
  }

  // 戻る
  const goBack = () => {
    router.push('/main')
  }

  // ログアウト
  const logout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }


  const getZodiac = (birthdate: string) => {
    const date = new Date(birthdate)
    const m = date.getMonth() + 1
    const d = date.getDate()

    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return '牡羊座'
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return '牡牛座'
    if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) return '双子座'
    if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) return '蟹座'
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return '獅子座'
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return '乙女座'
    if ((m === 9 && d >= 23) || (m === 10 && d <= 23)) return '天秤座'
    if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) return '蠍座'
    if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) return '射手座'
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return '山羊座'
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return '水瓶座'
    return '魚座'
  }

  // 運命数
  const getLifeNumber = (birthdate: string) => {
   
    const numbers = birthdate.replace(/-/g, '').split('')

    // 数字を全部足す
    let sum = numbers.reduce((acc, n) => acc + Number(n), 0)

    // 1桁になるまで繰り返す
    while (sum > 9)
     {sum = sum
        .toString()
        .split('')
        .reduce((acc, n) => acc + Number(n), 0)
      }

    return sum

  }

</script>


<style scoped>

  .container {
    text-align: center;

    height: 100vh;
    width: 100vw;

    background-image: url('/src/assets/moon1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }


  /* ヘッダー */
  .header-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%; 
    margin: 10px auto; 

    position: relative;
    z-index: 3;
  }

  .wood-top {
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 80px;

    background-image: url('/src/assets/mokuzai1.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    z-index: 2;
  }


  .main-title,
  .sub-title {
    text-shadow:
      0 0 3px #ffffff,
      0 0 6px #fff,
      0 0 8px #fff,
      0 0 12px #fff;
  }

  .main-title {
    font-size: 4rem;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .sub-title {
    font-size: 3rem;
    margin-bottom: 40px;
  }

  /* ユーザー名 */
  .user {
    font-weight: bold;
    font-size: 24px;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);

    position: relative;
    top: -10px;
  }

  /* 右側 */
  .header-buttons .right {
    display: flex;
    gap: 20px;
  }

  /* 共通ボタン*/
  .btn {
    display: inline-block;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 6px;
  }

  /*  個別ボタン調整 */
  .back-btn,
  .logout-btn {
    width: auto;
  }


  .profile {
    margin-top: 40px;
    font-size: 1.3rem; 
    line-height: 2; 
    color: #000;

    text-shadow:
      0 0 3px #fff,
      0 0 6px #fff,
      0 0 8px #fff,
      0 0 12px #f1ff2f;
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