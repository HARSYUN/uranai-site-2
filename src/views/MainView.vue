<template>

  <div class="container">

    <!-- ヘッダー -->
    <div class="header-buttons">
      <p class="user">{{ user.name }}様</p>

      <div class="right">
        <button class="btn mypage-btn" @click="goMyPage">
          マイページへ
        </button>

        <button class="btn logout-btn" @click="logout">
          ログアウト
        </button>
      </div>
    </div>

    <!-- 窓枠レイヤー -->
    <div class="frame-layer"></div>

    <div class="wood-top"></div>

    <!-- 文字・ボタン -->
    <div class="content">

      <h1 class="main-title">占いのハウス</h1>

      <button class="btn uranai-btn" @click="goResult">
        今日の運勢を占う
      </button>

    </div>

  </div>

  <p class="credit">
    Image Credit: NASA<br>
    窓枠画像：AI生成
  </p>

</template>


<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // localStorageからユーザー取得
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // マイページへ
  const goMyPage = () => {
    router.push('/mypage')
  }

  // ログアウト
  const logout = () => {
    localStorage.removeItem('user')
    router.push('/') // スタートへ
  }

  // 占い結果へ
  const goResult = () => {
    router.push('/main_result')
  }
</script>


<style scoped>

  /* 全体 */
  .container {
    position: relative;
    text-align: center;

    height: 100vh;
    width: 100vw;

    background-image: url('/src/assets/TheMilkyWay1.jpg');
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
    margin: 10px auto;

    position: relative;
    z-index: 3;
  }

  .frame-layer {
    position: absolute;
    top: -5%;
    right: -5%;

    width: 110vw;
    height: 110vh;

    background-image: url('/src/assets/AImadowaku3.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    z-index: 1;
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


  .user {
    font-weight: bold;
    font-size: 24px;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);

    position: relative;
    top: -10px;
  }

  .right {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }


  /* ボタン共通 */
  .btn {
    padding: 12px;
    font-size: 1rem;
    border-radius: 6px;
  }


  /* ヘッダーボタン */
  .mypage-btn,
  .logout-btn {
    width: auto;
    padding: 12px 20px;
  }


  /* メインボタン */
  .uranai-btn {
    display: block;
    width: 100%;
    max-width: 320px;
    margin: 30px auto;
    font-size: 1.2rem;
  }


  /* タイトル */
  .main-title {
    font-size: 4rem;
    position: relative;
    margin: 80px;

    text-shadow:
      0 0 3px #fff,
      0 0 6px #fff,
      0 0 9px #fff,
      0 0 12px #fff;
  }

  /* クレジット */
  .credit {
    position: fixed;
    bottom: 50px;
    right: -55%;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);

    position: relative;
    z-index: 4;
  }
  
  .content {
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

</style>